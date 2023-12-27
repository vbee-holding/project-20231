import { useGoogleOneTapLogin } from "@react-oauth/google";

const OneTap = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return <></>;
};
export default OneTap;
