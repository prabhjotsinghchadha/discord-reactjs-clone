import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = (e) => {
    signInWithPopup(auth, provider).catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://download.logo.wine/logo/Discord_(software)/Discord_(software)-Logo.wine.png"
          alt="Discord"
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
