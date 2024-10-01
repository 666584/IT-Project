import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthAPI from './AuthAPI';

const PrivateRoute = ({ children  }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await AuthAPI.auth({accessToken});
                if(response.data === "authorised"){
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
                console.log("Error on token verification.");
            }
        };
        checkAuth();
    }, []);
    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;