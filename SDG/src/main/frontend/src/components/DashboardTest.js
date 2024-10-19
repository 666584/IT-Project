import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './Layout/Navbar.js';

const DashboardComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
    const fetchUserData = async () => {
        console.log(params.userId);
        const userId = params.userId;
        try {
            const response = await axios.get(`http://localhost:8080/api/dashboard/${userId}`);
            if (!response.data) {
                throw new Error('Failed to fetch user data');
            }
            setRecord(response.data);
            setLoading(false);
        }catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Navbar>
            <div>
                <p><strong>Username:</strong> {record.username}</p>
                <p><strong>Current points: </strong> {record.currPoint}</p>
                <p><strong>Spent points: </strong> {record.spentPoints}</p>
                <p><strong>Total SDG Progress: </strong>{record.totalSDGProgress}/2550 </p>
                <p><strong>Modules complete: </strong> {record.numCompletedSDG}</p>
                <p><strong>Rewards Redeemed: </strong> {record.numReward}</p>
            </div>
        </div>
    );
};

export default DashboardComponent;