import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthAPI from '../../services/AuthAPI.js';
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import GoogleButton from "./GoogleButton";
import "./SignUpForm.css";

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await AuthAPI.register({ firstName, lastName, username, email, password1, password2 });
        setMessage(response.data);

        if (response.data === 'register_success') {
            navigate('/login');
        }
    } catch (error) {
        setMessage('Registration failed');
        console.log(message);
    }
  };

  return (
    <div className="signup-form">
      <h2 className="welcome">Welcome !!!</h2>
      <h1 className="sign">Sign Up</h1>
      <div className="all-input">
      <InputField label="First Name" type="text" placeholder="Aryan" onChange={(e) => setFirstName(e.target.value)}/>
      <InputField label="Last Name" type="text" placeholder="Saini" onChange={(e) => setLastName(e.target.value)}/>
      <InputField label="Username" type="text" placeholder="aryansaini" onChange={(e) => setUsername(e.target.value)}/>
      <InputField label="Email" type="email" placeholder="login@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
      <PasswordField label="Password" onChange={(e) => setPassword1(e.target.value)}/>
      <PasswordField label="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
      </div>
      <button className="register-btn" onClick={handleRegister}>Register</button>
      <p className="or">or continue with</p>
      <GoogleButton />
      <p className="signup-link">
        Don't have an account yet? <a href="/signup" font-color="#007bff">Sign up for free</a>
      </p>
    </div>
  );
}

export default SignUpForm;
