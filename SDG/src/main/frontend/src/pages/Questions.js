import React, { useState } from 'react';
import LeftSide from '../components/QuestionsComponents/LeftSide.js';
import Question from '../components/QuestionsComponents/Question.js';
import ProgressBar from '../components/QuestionsComponents/ProgressBar.js';
import { useNavigate } from 'react-router-dom';
import './Questions.css';
import AuthAPI from '../services/AuthAPI.js';
import GoalAPI from '../services/GoalAPI.js';
import { useParams } from 'react-router-dom';

const Questions = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const goalTitle = params.title;
    const goalTask = params.task;

    const questions = [
        {
            id: 1,
            text: "Which of the following is a key target of the goal to ensure quality education?",
            options: [
            { id: 'A', text: "Achieve universal primary and secondary education by 2030", isCorrect: true },
            { id: 'B', text: "Reduce the number of people living in extreme poverty", isCorrect: false },
            { id: 'C', text: "Promote sustainable agricultural practices", isCorrect: false },
            { id: 'D', text: "Ensure access to affordable, reliable, sustainable, and modern energy", isCorrect: false },
            ]
        },
        {
            id: 2,
            text: "What role do teachers play in achieving quality education?",
            options: [
            { id: 'A', text: "They increase the need for technological innovation", isCorrect: false },
            { id: 'B', text: "They are essential for providing quality instruction and fostering a positive learning environment", isCorrect: true },
            { id: 'C', text: "They decrease economic inequality", isCorrect: false },
            { id: 'D', text: "They increase agricultural productivity", isCorrect: false },
            ]
        },
        {
            id: 3,
            text: "Which population groups are most targeted by the goal to ensure quality education?",
            options: [
            { id: 'A', text: "Urban area people", isCorrect: false },
            { id: 'B', text: "All individuals, with special focus on vulnerable populations such as girls, children in rural areas, and those with disabilities", isCorrect: true },
            { id: 'C', text: "Technology sector employees", isCorrect: false },
            { id: 'D', text: "People with serious diseases", isCorrect: false },
            ]
        },
        {
            id: 4,
            text: "Why is access to early childhood education important in promoting lifelong learning?",
            options: [
            { id: 'A', text: "It lays the foundation for future learning and development, improving long-term educational outcomes", isCorrect: true },
            { id: 'B', text: "It increases government spending", isCorrect: false },
            { id: 'C', text: "It reduces the need for international aid", isCorrect: false },
            { id: 'D', text: "It promotes luxury educational products", isCorrect: false },
            ]
        },
        {
            id: 5,
            text: "How does improving literacy rates contribute to achieving quality education?",
            options: [
            { id: 'A', text: "By increasing the number of fast food outlets", isCorrect: false },
            { id: 'B', text: "By empowering individuals with the skills needed to access information, improve their livelihoods, and participate fully in society", isCorrect: true },
            { id: 'C', text: "By reducing agricultural output", isCorrect: false },
            { id: 'D', text: "By increasing food waste", isCorrect: false },
            ]
        },
        ];

    const handleOptionClick = (option) => {
        setSelectedOption(option.id);
        setIsCorrect(option.isCorrect);
        setShowError(false);
    };

    const handleComplete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await GoalAPI.module({
                accessToken: accessToken,
                goalTitle: goalTitle,
                goalTask: goalTask,
            });
            if (response.data === "Progress saved." || response.data === "Completed task for the first time.") {
                if (response.data === "Completed task for the first time.") {
                    setShowPopup(true);
                } else {
                    navigate(`/dashboard`);
                }
            }
        } catch (error) {
            const message = error.response?.data;
            alert(message);
        }
    };

    const handleNext = async () => {
        if (isCorrect === true) {
            setSelectedOption(null);
            setIsCorrect(null);
            setShowError(false);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                await handleComplete();
            }
        } else {
            setShowError(true);
        }
    };

    const handleBack = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        setShowError(false);
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/dashboard');
    };

    return (
        <div className="quiz-container">
            <LeftSide />
            <div className="right-side">
                {questions[currentQuestion] ? ( // Add a check to ensure question exists
                    <Question
                        question={questions[currentQuestion]}
                        selectedOption={selectedOption}
                        handleOptionClick={handleOptionClick}
                        isCorrect={isCorrect}
                    />
                ) : (
                    <p className="error">No question found!</p>
                )}
                
                {showError && <p className="error">Please select the correct answer before proceeding!</p>}

                <div className="button-container">
                    <button className="question-button" onClick={handleBack}>Back</button>
                    <button className="question-button" onClick={handleNext}>
                        {currentQuestion < questions.length - 1 ? 'Next' : 'Finished'}
                    </button>
                </div>
            </div>

            {/* Congratulations Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-button" onClick={handleClosePopup}>X</button>
                        <img 
                            src={require('../assets/QuestionsAssets/images/redeemed.png')} 
                            alt="Congratulations" 
                            className="popup-image"
                        />
                        <p>Congratulations! You've earned points!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions;
