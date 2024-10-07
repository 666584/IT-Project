import React, { useState } from 'react';
import './GoalCard.css';
import playbutton from '../../assets/play-circle.svg';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../AuthAPI';

function GoalCard({ key, title, goal, color, icon }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleClick = async(e) => {
    e.preventDefault();
      const accessToken = localStorage.getItem('accessToken');                  
      try {
          const response = await AuthAPI.auth({ accessToken });         
          navigate(`/goal/${title}/${response.data}`);    
      }catch (error) {
          setMessage('Invalid credentials');
      }
  };

  return (
    <div className="goal-card" style={{ backgroundColor: color }}>
      <div className="goal-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{goal}</p>
      <button className="play-button" onClick={handleClick}>
        <img src={playbutton} alt="Play" />
      </button>
    </div>
  );
}

export default GoalCard;
