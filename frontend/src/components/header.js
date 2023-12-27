"use client";
import Image from "next/image";
import OneTap from "./oneTap";
import { GoogleSignInButton, ButtonLogin } from "./authButton";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getSession } from "@/utils/getSession";

const Header = () => {
  const storedSession = getSession();

  const { data: session, status } = useSession({
    initialData: { session: storedSession },
  });
  console.log(session);
  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem("userSession", JSON.stringify(session));
    } else if (status === "unauthenticated") {
      localStorage.removeItem("userSession");
    }
  }, [session]);

  return (
    <header className="bg-header fixed top-0 z-10 w-full h-16">
      {status === "unauthenticated" && <OneTap />}
      <div className=" relative h-full max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="grow">
          <Image
            src="/assets/images/VozIcon.png"
            alt="logo"
            width={80}
            height={80}
            style={{ width: "auto", height: "50px" }}
            priority={false}
          />
        </div>
        <div className="flex">
          {status === "authenticated" && (
            <GoogleSignInButton image={session.user.image} name={session.user.name} email={session.user.email}/>
          )}
          {status === "unauthenticated" && <ButtonLogin />}
        </div>
      </div>
    </header>
  );
};
export default Header;
