import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginByGoogle = () => {
  const navigate = useNavigate();
  const responseGoogle = (authresult) => {
    try {
      if (authresult["code"]) {
        const response = axios
          .get(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/user/auth-with-google?code=${authresult["code"]}`
          )
          .then((data) => {
            if (data.data.message === "login successfully") {
              navigate("/");
              localStorage.setItem(
                "userRole",
                JSON.stringify(data.data?.user?.userRole)
              );
            }
            console.log(data);
          });
      }
      console.log(authresult);
    } catch (error) {
      console.error("Error while requesting goole core : ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={googleLogin}
        className="p-3 border-2 cursor-pointer border-black"
      >
        Login With Google
      </button>
    </div>
  );
};

export default LoginByGoogle;
