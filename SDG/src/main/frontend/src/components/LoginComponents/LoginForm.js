import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailField from "./EmailField.js";
import PasswordField from "./PasswordField.js";
import GoogleButton from "./GoogleButton.js";
import AuthAPI from '../../services/AuthAPI.js';
import Popup from '../Popup.js';
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setPopupMessage("Please enter your email.");
      setIsPopupVisible(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setPopupMessage("Please enter a valid email address.");
      setIsPopupVisible(true);
      return;
    }
    if (!password) {
      setPopupMessage("Please enter your password.");
      setIsPopupVisible(true);
      return;
    }

    try {
      localStorage.clear();    

      const response = await AuthAPI.login({ email, password });           
      const { tokenType, accessToken, refreshToken } = response.data;              
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);      
      navigate('/dashboard'); 
    } catch (error) {
      const message = error.response?.data;
      
      if(message == null) {
        console.log("Server not connected.");
      }
      
      setPopupMessage(message);
      setIsPopupVisible(true);
      console.log(message);
    }
  };

  return (
    <div className="signup-form">
      <Popup                
        message={popupMessage} 
        isVisible={isPopupVisible} 
        onClose={() => setIsPopupVisible(false)} 
      />
      <h2 className="welcome">Welcome Back!!!</h2>
      <h1 className="sign">Log IN</h1>
      <div className="all-input">
      <EmailField label="Email" type="email" placeholder="login@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
      <PasswordField label="Password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button className="register-btn" onClick={handleLogin}>LOGIN</button>
      <p className="or">or continue with</p>
      <GoogleButton />
      <p className="signup-link">
        Don't have an account yet? <a href="/signup" font-color="#007bff">Sign up for free</a>
      </p>
    </div>
  );
}

export default LoginForm;
