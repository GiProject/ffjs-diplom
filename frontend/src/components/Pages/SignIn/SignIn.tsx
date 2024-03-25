import React from "react";
import SignInForm from "./SignInForm/SignInForm";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  return (
    <div className="login-page">
      <SignInForm />
    </div>
  );
};

export default SignIn;
