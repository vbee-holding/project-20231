"use client";
import Image from "next/image";
import { AvatarUser } from "./authButton";
import { GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from '@/utils/axios'
import { Icons } from "./icons";

const HeaderContainer = ({ children }) => {
  return (
    <header className="bg-header fixed top-0 z-10 w-full h-16">
      <div className=" relative h-full max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="grow">
          <a href="/">
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          </a>
        </div>
        <div className="flex">{children}</div>
      </div>
    </header>
  );
};
const Header = () => {
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  return (
    <>
      <HeaderContainer>
        {!userSession && (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              const { credential } = credentialResponse;
              const payload = credential ? decodeJwt(credential) : undefined;
              if (payload) {
                // console.log(payload);
                const userSess = {
                  email: payload.email,
                  image: payload.picture,
                  name: payload.name,
                };
                localStorage.setItem("userSession", JSON.stringify(userSess));
                
                axios.post('user/profile', {
                  email: payload.email,
                  image: payload.picture,
                  name: payload.name,
                  isNotifi: 0,
                })
                .then()
                .catch((error) => {
                  console.log(error);
                });

              }
              window.location.reload();
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
            theme="outline"
            type="icon"
            shape="circle"
          />
        )}
        {userSession && (
          <AvatarUser
            image={userSession.image}
            name={userSession.name}
            email={userSession.email}
          />
        )}
      </HeaderContainer>
    </>
  );
};
export default Header;
