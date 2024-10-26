import React, { useState } from 'react';
import LeftSide from './QuestionsComponents/LeftSide';
import Question from './QuestionsComponents/Question';
import ProgressBar from './QuestionsComponents/ProgressBar'; // Import ProgressBar here
import { useNavigate } from 'react-router-dom';
import './Questions.css';
import AuthAPI from './services/AuthAPI.js';
import GoalAPI from './services/GoalAPI.js';
import { useParams } from 'react-router-dom';

const Questions = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showError, setShowError] = useState(false);  // Track if the user tried to move forward without selecting the correct answer.
    const navigate = useNavigate();
    const params  = useParams();
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

  // Handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option.id);
        setIsCorrect(option.isCorrect);
        setShowError(false);  // Reset error message when the user selects an option
    };

    // Go back to dashboard
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
                    alert("Congratulations! You've earned points!");
                }
                
                const res = await AuthAPI.auth({ accessToken });
                navigate(`/dashboard/${res.data}`);
            }
        } catch (error) {
            const message = error.response?.data;
            alert(message);
        }
    };

    // Go to the next question
    const handleNext = async() => {
        if (isCorrect === true) {
            setSelectedOption(null);
            setIsCorrect(null);
            setShowError(false); // Reset the error state for the next question
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            }else {
                await handleComplete();
            }
        } else {
        setShowError(true);  // Show an error if the correct answer has not been selected
        }
    };

    // Go to the previous question
    const handleBack = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        setShowError(false); // Reset the error state for the previous question
        if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="quiz-container">
        <LeftSide />
        <div className="right-side">
        
            <Question
            question={questions[currentQuestion]}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
            isCorrect={isCorrect}
            />
            
            {showError && <p className="error">Please select the correct answer before proceeding!</p>} {/* Error message */}
            
            <div className="button-container">
            <button className="question-button" onClick={handleBack}>Back</button> {/* Back button is always available */}
            <button className="question-button" onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? 'Next' : 'Finished'}
            </button> {/* Next button remains accessible */}
            </div>
        </div>
        </div>
    );
    };

export default Questions;
