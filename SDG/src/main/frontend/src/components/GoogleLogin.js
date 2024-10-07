import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import AuthAPI from '../AuthAPI';
import axios from "axios";

const GoogleLogin = () => {
    const navigate = useNavigate();

    const hash = window.location.hash;
    const token = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));

    const handleLogin  = async () => {       
        try {
            const response = await AuthAPI.googleLogin({ accessToken: token }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { tokenType, accessToken, refreshToken } = response.data;        
            
            localStorage.clear();
            localStorage.setItem('tokenType', tokenType);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);       
            
            const res = await AuthAPI.auth({accessToken});            
            navigate(`/dashboard/${res.data}`); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            handleLogin(token);
        } else {
            console.log("Login again.");
        }
    }, [token, navigate]);
}

export default GoogleLogin;

