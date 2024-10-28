import React from 'react';
import greenTick from '../../assets/QuestionsAssets/images/tick.png';
import './Question.css';

const Question = ({ question, selectedOption, handleOptionClick, isCorrect }) => {
  return (
    <div className="question-section">
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption === option.id ? 'selected' : ''} ${isCorrect && option.isCorrect ? 'correct' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
            {isCorrect && option.isCorrect && <img src={greenTick} alt="Correct" className="tick" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
