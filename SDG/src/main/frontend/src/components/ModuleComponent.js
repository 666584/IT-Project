import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalAPI from './services/GoalAPI.js';

const ModuleComponent = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
    const handleClick = async (e) => {
	    e.preventDefault();
		try {
			const accessToken = localStorage.getItem('accessToken');
			const goalTitle = "No Poverty";
			const goalTask = "overview"
			const response = await GoalAPI.module({			
				accessToken: accessToken,
			    goalTitle: goalTitle,
				goalTask: goalTask,
			});
		} catch(error) {
			setMessage('Error.');
		}
	};
	return (
        <div className="container mt-5">
            <h2>Goal</h2>
            <p>Goal1</p>
			<button onClick={handleClick}>Task: Overview of No Poverty Completed</button>
        </div>
    );
};

export default ModuleComponent;