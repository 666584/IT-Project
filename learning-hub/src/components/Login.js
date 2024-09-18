// src/components/Login.js
import React from 'react';
import '../assets/styles/Login.css';
import SocialLogin from './SocialLogin';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome back !!!</h2>
        <h1>Log In</h1>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="login@gmail.com" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="********" required />
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <SocialLogin />
        <p className="signup-link">
          Don't have an account yet? <a href="#">Sign up for free</a>
        </p>
      </div>
      <div className="illustration">
        <img src="../assets/styles/image.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;
