"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

const Header = () => {
  const [loginData, setLoginData] = useState(false)
  const login = useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  return (
    <header className="bg-custom fixed top-0 z-10 w-full h-16">
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
          <div className="flex justify-between items-center">
            <div className="mr-1">
              <button className="bg-gray-950 hover:bg-gray-900 active:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-max">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
