import React, { useState, useEffect } from 'react';
import './ProgressSection.css';

const ProgressSection = ({ totalSDGProgress }) => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    if (totalSDGProgress === 0) {
      setPercentage(1);
    } else {
      const result = (totalSDGProgress / 2550) * 100;
      setPercentage(Math.round(result));
    }
  }, [totalSDGProgress]);

  // Determine progress bar color based on percentage
  const progressBarColor = percentage > 55 ? '#FFFFFF' : '#222222';
  const progressTextColor = percentage > 55 ? '#222222' : '#FFFFFF';

  return (
    <div className="progress-section">
      <div className="sdg-progress">
        <h1 className="progress-number">{totalSDGProgress}/2550</h1>
        <p className="progress-text">Total SDG Progress</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
              background: progressBarColor,
              color: progressTextColor,
            }}
          >
            <span className="progress-percentage">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="progress-image">
        <img src={require('../../assets/DashboardAssets/Images/Progress.png')} alt="Progress illustration" />
      </div>
    </div>
  );
};

export default ProgressSection;
