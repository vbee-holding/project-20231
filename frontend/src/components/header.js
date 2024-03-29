"use client";
import { AvatarUser } from "./authButton";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "@/utils/axios";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderContainer = ({ children }) => {
  const router = useRouter();
  return (
    <header className="bg-header fixed top-0 z-10 w-full h-16">
      <div className=" relative h-full max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <button onClick={() => router.push("/")}>
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          </button>
        </div>
        <div className="flex">{children}</div>
      </div>
    </header>
  );
};
const Header = () => {
  const [userSession, setUserSession] = useState();
  const router = useRouter();
  useEffect(() => {
    setUserSession(JSON.parse(localStorage.getItem("userSession")));
  }, []);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Gửi yêu cầu đến Google's UserInfo Endpoint
      const payload = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })
        .then((response) => {
          // Xử lý thông tin người dùng từ response
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching user info:", error.response.data);
        });

      if (payload) {
        const userSess = {
          googleId: payload.sub,
          email: payload.email,
          profileImgUrl: payload.picture,
          username: payload.name,
          isNotifi: 0,
        };

        axios
          .post("user/profile", {
            googleId: payload.sub,
            email: payload.email,
            image: payload.picture,
            name: payload.name,
            isNotifi: 0,
          })
          .then((res) => {
            if (res.status === 201) {
              localStorage.setItem(
                "userSession",
                JSON.stringify(res.data.user)
              );
              setUserSession(res.data.user);
            } else {
              localStorage.setItem("userSession", JSON.stringify(userSess));
              setUserSession(userSess);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      router.refresh();
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "implicit",
  });
  return (
    <>
      <HeaderContainer>
        {
          !userSession && (
            <div onClick={() => login()} className="bg-white rounded-full">
              <Icons.login />
              <div className="hidden">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    // console.log(credentialResponse);
                    const { credential } = credentialResponse;
                    const payload = credential
                      ? decodeJwt(credential)
                      : undefined;
                    if (payload) {
                      // console.log(payload);
                      const userSess = {
                        googleId: payload.sub,
                        email: payload.email,
                        profileImgUrl: payload.picture,
                        username: payload.name,
                        isNotifi: 0,
                      };

                      axios
                        .post("user/profile", {
                          googleId: payload.sub,
                          email: payload.email,
                          image: payload.picture,
                          name: payload.name,
                          isNotifi: 0,
                        })
                        .then((res) => {
                          if (res.status === 201) {
                            localStorage.setItem(
                              "userSession",
                              JSON.stringify(res.data.user)
                            );
                            setUserSession(res.data.user);
                          } else {
                            localStorage.setItem(
                              "userSession",
                              JSON.stringify(userSess)
                            );
                            setUserSession(userSess);
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                    router.refresh();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  theme="outline"
                  type="icon"
                  shape="circle"
                />
              </div>
            </div>
          )
          // (

          // )
        }
        {userSession && (
          <AvatarUser
            setUserSession={setUserSession}
            image={userSession.profileImgUrl}
            name={userSession.username}
            email={userSession.email}
            userSession={userSession}
          />
        )}
      </HeaderContainer>
    </>
  );
};
export default Header;
