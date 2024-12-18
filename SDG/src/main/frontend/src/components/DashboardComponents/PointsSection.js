// PointsSection.js
import React from "react";
import './PointsSection.css';

const PointsSection = ({currPoints, spentPoints}) => {
  return (
    <div className="points-section">
      <div className="points-card">
        <h1 className="points-number">{currPoints}</h1>
        <p className="points-text">Current Points</p>
      </div>
      <div className="points-image">
        <img src={require("../../assets/DashboardAssets/Images/Points.png")} alt="Points illustration" />
      </div>
      <div className="points-card">
        <h1 className="points-number">{spentPoints}</h1>
        <p className="points-text">Spent Points</p>
      </div>
    </div>
  );
};

export default PointsSection;
