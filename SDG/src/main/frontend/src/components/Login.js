import React from "react";
import LoginForm from "./LoginComponents/LoginForm";
import Illustration from "./LoginComponents/Illustration";
import "./Login.css";

function Login() {
  return (
    <div className="app-container">
      <LoginForm />
      <Illustration />
    </div>
  );
}

export default Login;
