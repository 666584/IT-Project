import React from 'react';
import './GoalCard.css';
import playbutton from '../../assets/play-circle.svg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function GoalCard({ key, title, goal, color, icon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/goal/${title}`); 
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
