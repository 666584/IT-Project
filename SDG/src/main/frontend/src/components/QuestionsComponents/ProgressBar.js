import React from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  return (
    <div className="progress-bar-quiz">
      <div className="progress-step active">1</div>
      <div className="progress-step">2</div>
      <div className="progress-step">3</div>
      <div className="progress-step">4</div>
      <div className="progress-step">5</div>
    </div>
  );
};

export default ProgressBar;
