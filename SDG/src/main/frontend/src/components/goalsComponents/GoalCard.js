import React from 'react';
import './GoalCard.css';
import playbutton from './icons/play-circle.svg';

function GoalCard({ title, goal, color, icon }) {
  return (
    <div className="goal-card" style={{ backgroundColor: color }}>
      <div className="goal-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{goal}</p>
      <button className="play-button">
            <img src={playbutton} alt="Play" />
          </button>
    </div>
  );
}

export default GoalCard;
