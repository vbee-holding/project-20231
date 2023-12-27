"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { getSession } from "@/utils/getSession";
export function GoogleSignInButton() {
  const storedSession = getSession();
  const handleClick = () => {
    signOut();
    localStorage.removeItem("userSession");
  };

  return (
    <div>
      <div className="cursor-pointer mr-2" onClick={() => handleClick()}>
        {storedSession && (
          <Image
            className="rounded-full"
            src={storedSession.user.image}
            alt="avatar"
            width={45}
            height={45}
          />
        )}
      </div>
    </div>
  );
}

export function ButtonLogin() {
  const storedSession = getSession();

  const { data: session } = useSession({ initialData: storedSession });

  // useEffect(() => {
  //   if (session) {
  //     localStorage.setItem("userSession", JSON.stringify(session));
  //   }
  // }, [session]);
  const handleClick = () => {
    signIn("google");
  };
  return (
    <div className="flex justify-between items-center">
      <div className="mr-1">
        <button
          onClick={() => handleClick()}
          className="bg-button hover:bg-violet-500 active:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-max"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
