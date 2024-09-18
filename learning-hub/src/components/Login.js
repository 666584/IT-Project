// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Link to the CSS file for styling
import illustration from '../assets/illustration.png'; // Import the illustration image

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h3>Welcome back !!!</h3>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="login@gmail.com"
              required
            />
          </div>
          <div className="input-group password-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <p className="divider">or continue with</p>
          <div className="social-login">
            <button className="social-button google">G</button>
            <button className="social-button github">GH</button>
            <button className="social-button facebook">F</button>
          </div>
          <p className="signup-text">
            Don't have an account yet? <a href="#">Sign up for free</a>
          </p>
        </form>
      </div>
      <div className="illustration">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
}

export default Login;
