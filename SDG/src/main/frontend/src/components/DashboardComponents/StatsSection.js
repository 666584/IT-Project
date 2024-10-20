// StatsSection.js
import React from "react";
import './StatsSection.css';

const StatsSection = ({numCompletedSDG, numReward}) => {
  return (
    <div className="stats-section">
      <div className="stat-card modules-complete">
        <h1 className="stat-number">{numCompletedSDG}</h1>
        <p className="stat-text">Modules Complete</p>
      </div>
      <div className="stat-card rewards-earned">
        <h1 className="stat-number">{numReward}</h1>
        <p className="stat-text">Rewards Earned</p>
      </div>
    </div>
  );
};

export default StatsSection;
