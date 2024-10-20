import React, { useState, useEffect } from 'react';
import PointsSection from './DashboardComponents/PointsSection';
import ProgressSection from './DashboardComponents/ProgressSection';
import StatsSection from './DashboardComponents/StatsSection';
import CouponsSection from './DashboardComponents/CouponsSection';
import ArticlesSection from './DashboardComponents/ArticlesSection';
import EventsSection from './DashboardComponents/EventsSection';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "./Dashboard.css";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params  = useParams();
    
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
    <div className="dashboard-container">
        <Helmet>
        <title>Dashboard</title>
        </Helmet>
        <div className="main-content">
            <div className="points-progress-wrapper">
                <PointsSection currPoints={record.currPoint} spentPoints={record.spentPoints} />
                <ProgressSection totalSDGProgress={record.totalSDGProgress}/>
            </div>

            <div className="sections-container">
                <StatsSection numCompletedSDG={record.numCompletedSDG} numReward={record.numReward}/>
                <CouponsSection currPoints={record.currPoint} userId={params.userId}/>
                <ArticlesSection />
            </div>

                <EventsSection />
            </div>
    </div>
  );
};

export default Dashboard;
