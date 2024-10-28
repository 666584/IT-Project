import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthAPI from './services/AuthAPI.js';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(accessToken === null){
                localStorage.clear();
                setIsAuthenticated(false);
                return;
            }
            try {
                const response = await AuthAPI.auth({accessToken});
                if(response.data != null){
                    console.log(response.data);
                    setIsAuthenticated(true);
                } else {
                    console.log(response);
                    console.log("Access failed.");
                    setIsAuthenticated(false);
                }
            } catch(error) {
                setMessage('Error on token verification.');
                setIsAuthenticated(false);
                console.log(message);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === false) {
        localStorage.clear();
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;