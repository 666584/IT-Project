import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar.js';
import GoalCard from '../components/ModuleComponents/GoalCard.js';
import './Module.css';
import { Helmet } from 'react-helmet';

// Import the SDG images
import NoPovertyIcon from '../assets/SDGIcons/SDG1.jpg';
import ZeroHungerIcon from '../assets/SDGIcons/SDG2.jpg';
import GoodHealthIcon from '../assets/SDGIcons/SDG3.jpg';
import QualityEducationIcon from '../assets/SDGIcons/SDG4.jpg';
import GenderEqualityIcon from '../assets/SDGIcons/SDG5.jpg';
import CleanWaterIcon from '../assets/SDGIcons/SDG6.jpg';
import AffordableEnergyIcon from '../assets/SDGIcons/SDG7.jpg';
import DecentWorkIcon from '../assets/SDGIcons/SDG8.jpg';

function Module() {
  const [searchTerm, setSearchTerm] = useState('');
  const goalsData = [
    { id: 1, title: 'No Poverty', goal: 'Goal 1', color: '#EA1B2D', icon: NoPovertyIcon },
    { id: 2, title: 'Zero Hunger', goal: 'Goal 2', color: '#D19E28', icon: ZeroHungerIcon },
    { id: 3, title: 'Good Health', goal: 'Goal 3', color: '#269A45', icon: GoodHealthIcon },
    { id: 4, title: 'Quality Education', goal: 'Goal 4', color: '#C11E31', icon: QualityEducationIcon },
    { id: 5, title: 'Gender Equality', goal: 'Goal 5', color: '#EF4129', icon: GenderEqualityIcon },
    { id: 6, title: 'Clean Water', goal: 'Goal 6', color: '#00ADD8', icon: CleanWaterIcon },
    { id: 7, title: 'Affordable Energy', goal: 'Goal 7', color: '#FBB611', icon: AffordableEnergyIcon },
    { id: 8, title: 'Decent Work', goal: 'Goal 8', color: '#8E1737', icon: DecentWorkIcon },
    
  ]; 

  const filteredGoals = goalsData.filter((goal) =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
        <Helmet>
          <title>Module</title>
        </Helmet>
        <div className="main-content">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} ></Navbar>
          <div className="header">Sustainable Development Goals</div>
        <div className="goals-grid">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              goal={goal.goal}
              color={goal.color}
              icon={<img src={goal.icon} alt={goal.title} className="goal-icon-img" />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Module;
