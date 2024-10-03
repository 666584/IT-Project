import React from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const DashboardComponent = () => {
	return (
        <div className="container mt-5">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
			<Link to="/module">Module</Link>
        </div>
    );
};

export default DashboardComponent;