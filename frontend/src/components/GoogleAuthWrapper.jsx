import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginByGoogle from "./LoginByGoogle";

const GoogleAuthWrapper = ({ clientId }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginByGoogle></LoginByGoogle>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
