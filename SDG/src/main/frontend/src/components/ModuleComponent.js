import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalAPI from './services/GoalAPI.js';
import { useParams } from 'react-router-dom';

const ModuleComponent = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const params  = useParams();
	const goalTitle = params.title;
	const goalTask = params.task;
    const handleOverviewClick = async (e) => {
	    e.preventDefault();
		try {
			const accessToken = localStorage.getItem('accessToken');
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
            <h2>{goalTitle}</h2>
            <p>{goalTask}</p>
			<button onClick={handleOverviewClick}>Task: {goalTask} of {goalTitle} Completed</button>
        </div>
    );
};

export default ModuleComponent;