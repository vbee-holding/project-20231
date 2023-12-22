"use client";
import Image from "next/image";
import OneTap from "./oneTap";
import { GoogleSignInButton, ButtonLogin } from "./authButton";
import { getSession } from "@/utils/getSession";

const Header = () => {
  return (
    <header className="bg-header fixed top-0 z-10 w-full h-16">
      {/* {!storedSession && <OneTap />} */}
      <OneTap />
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
          {/* <GoogleSignInButton /> */}
          <ButtonLogin />
          {/* {storedSession && <GoogleSignInButton />} */}
          {/* {!storedSession && <ButtonLogin />} */}
        </div>
      </div>
    </header>
  );
};
export default Header;
