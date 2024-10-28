import React, { useState } from 'react';
import './GoalCard.css';
import playbutton from '../../assets/GoalAssets/playbutton.svg';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../services/AuthAPI.js';

function GoalCard({ title, goal, color, icon }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleClick = async(e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');                  
    try {
      const response = await AuthAPI.auth({ accessToken });         
      navigate(`/${response.data}/goal/${title}`);    
    } catch (error) {
      setMessage('Invalid credentials');
      console.log(message);
    }
  };

  return (
    <div className="goal-card" style={{ backgroundColor: color }}>
      <div className="goal-icon">{icon}</div>
      <button className="play-button" onClick={handleClick}>
        <div>
          <h3 className='titleti'>{title}</h3>
          <p className='goalti'>{goal}</p>
        </div>
        <img src={playbutton} alt="Play" />
      </button>
    </div>
  );
}

export default GoalCard;
