// ProgressSection.js
import React, { useState, useEffect } from 'react';
import './ProgressSection.css';

const ProgressSection = ({totalSDGProgress}) => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if(totalSDGProgress == 0){
      setPercentage(0);
    } else {
      const result = (totalSDGProgress / 2550) * 100;
      setPercentage(Math.round(result));
    }
  }, []);
  return (
    <div className="progress-section">
      <div className="sdg-progress">
        <h1 className="progress-number">{totalSDGProgress}/2550</h1>
        <p className="progress-text">Total SDG Progress</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}>
            <span className="progress-percentage">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="progress-image">
        <img src={require("./Images/Progress.png")} alt="Progress illustration" />
      </div>
    </div>
  );
};

export default ProgressSection;