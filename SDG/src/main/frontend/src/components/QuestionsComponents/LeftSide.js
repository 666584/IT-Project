import React from 'react';
import QuizImg from '../../assets/QuestionsAssets/images/quiz.png'; // Update path based on your project structure
import ProgressBar from './ProgressBar'; // Import the ProgressBar component
import './LeftSide.css';

const LeftSide = () => {
  return (
    <div className="leftside-container">
      <img src={QuizImg} alt="Quiz" className="quality-image" />
      <div className="text-section">
        <h2>Quality Education</h2>
        <p>Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
      </div>
      <div className="separator"></div> {/* Line between sections */}
      <div className="did-you-know">
        <h4>DID YOU KNOW?</h4>
        <p>Without additional measures, 84 million youth will be out of school by 2030.</p>
      </div>
      <ProgressBar /> {/* ProgressBar component added here */}
      
    </div>
  );
};

export default LeftSide;
