import React, { useState } from 'react';
import './Login.css'; // Link to the CSS file for styling
import illustration from '../assets/illustration.png'; // Import the illustration image
import { useNavigate, Link } from 'react-router-dom';
import AuthAPI from '../AuthAPI';
import { Helmet } from 'react-helmet';
import GoogleLogin from './GoogleLogin'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        localStorage.clear();        
        const response = await AuthAPI.login({ email, password });           
        const { tokenType, accessToken, refreshToken } = response.data;        
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);       
        const res = await AuthAPI.auth({ accessToken });            
        navigate(`/dashboard/${res.data}`); 
      } catch (error) {
        const message = error.response?.data;
        alert(message);
      }
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${ process.env.REACT_APP_GOOGLE_CLIENT_ID }
		&redirect_uri=${ process.env.REACT_APP_GOOGLE_REDIRECT_URL  }
		&response_type=token
		&scope=email profile`;
  };

  return (
    <div className="login-page">
      <Helmet>
          <title>Login</title>
      </Helmet>
      <div className="login-form">
        <h3>Welcome back !!!</h3>
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
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
            <button className="social-button google" GoogleLogin onClick = { handleGoogleLogin }>G</button>
          </div>
          <p className="signup-text">
            Don't have an account yet? <Link to="/register">Sign up for free</Link>
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
