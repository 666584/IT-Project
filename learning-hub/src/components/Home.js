// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import the CSS file for styling
import hero from '../assets/hero.jpg'; // Import the illustration image
import StudentDashboard from '../assets/StudentDashboard.png'; 
import comicbook from '../assets/comicbook.png'; 

function Home() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle the Log in button click
  const handleLoginClick = () => {
    navigate('/login'); // Navigates to the Login page
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="site-title">SDG LearningHub</h1>
        <div className="header-buttons">
          <button className="login-button" onClick={handleLoginClick}>
            Log in
          </button>
          <button className="signup-button">Sign Up</button>
        </div>
      </header>

      <section className="hero-section">
        <h2>Empowering Students for a Sustainable Future</h2>
        <p className="hero-text">
          The SDG website aims to educate, engage, and empower students to learn about the United Nations Sustainable
          Development Goals.
        </p>
        <img src={hero} alt="hero"  className="hero-image" />
        
      </section>

      <section className="features-section">
        <div className="feature">
          <h3>Personalized Dashboard</h3>
          <p>
            Track your progress, earn rewards, and manage your sustainability journey all in one place. Get insights on
            completed modules, quizzes, and set your personal sustainability goals.
          </p>
          <img src={StudentDashboard} alt="Dashboard" className="feature-image" />
        </div>

        <div className="feature">
          <h3>Interactive Comic Book Modules</h3>
          <p>
            Learn about sustainability in a fun and engaging way! Our comic book-style modules guide you through each
            SDG with stories, interactive quizzes, and challenges that make learning exciting.
          </p>
          <img img src={comicbook} alt="Comic Book Module" className="feature-image" />
        </div>
      </section>
    </div>
  );
}

export default Home;
