import React from "react";
import SignUpForm from "../components/SignUpComponents/SignUpForm";
import Illustration from "../components/SignUpComponents/Illustration";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="app-container-signup">
      <SignUpForm />
      <Illustration />
    </div>
  );
}

export default SignUp;
