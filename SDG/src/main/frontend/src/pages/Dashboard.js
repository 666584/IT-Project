import React, { useState, useEffect } from 'react';
import PointsSection from '../components/DashboardComponents/PointsSection.js';
import ProgressSection from '../components/DashboardComponents/ProgressSection.js';
import StatsSection from '../components/DashboardComponents/StatsSection.js';
import CouponsSection from '../components/DashboardComponents/CouponsSection.js';
import ArticlesSection from '../components/DashboardComponents/ArticlesSection.js';
import EventsSection from '../components/DashboardComponents/EventsSection.js';
import DashboadAPI from '../services/DashboardAPI.js';
import AuthAPI from '../services/AuthAPI.js';
import { Helmet } from 'react-helmet';
import "./Dashboard.css";

const Dashboard = () => {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem("accessToken");
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await AuthAPI.auth({accessToken});
            setUserId(response.data);
            try {
                const res = await DashboadAPI.userData(response.data);
                if (!res.data) {
                    throw new Error('Failed to fetch user data');
                }
                setRecord(res.data);
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
                <CouponsSection currPoints={record.currPoint} userId={userId}/>
                <ArticlesSection />
            </div>

                <EventsSection />
            </div>
    </div>
  );
};

export default Dashboard;
