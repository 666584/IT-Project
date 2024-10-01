import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalAPI from '../GoalAPI';

const ModuleComponent = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
    const handleClick = async (e) => {
	    e.preventDefault();
		try {
			const accessToken = localStorage.getItem('accessToken');
			const goalTitle = "TestGoal1";
			const response = await GoalAPI.module({			
				accessToken: accessToken,
			    goalTitle: goalTitle,
			});
		} catch(error) {
			setMessage('Error.');
		}
	};
	return (
        <div className="container mt-5">
            <h2>Goal</h2>
            <p>Goal1</p>
			<button onClick={handleClick}>Task Completed</button>
        </div>
    );
};

export default ModuleComponent;