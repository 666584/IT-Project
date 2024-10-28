import React from "react";
import LoginForm from "../components/LoginComponents/LoginForm";
import Illustration from "../components/LoginComponents/Illustration";
import "./Login.css";

function Login() {
  return (
    <div className="app-container-login">
      <LoginForm />
      <Illustration />
    </div>
  );
}

export default Login;
