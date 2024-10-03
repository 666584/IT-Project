import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import GoalCard from './goalsComponents/GoalCard';
import './Goals.css';
import { Helmet } from 'react-helmet';

function Goals() {
  const [searchTerm, setSearchTerm] = useState('');
  const goalsData = [
    { id: 1, title: 'No Poverty', goal: 'Goal 1', color: '#E5233E', icon: '🧑‍🤝‍🧑' },
    { id: 2, title: 'Zero Hunger', goal: 'Goal 2', color: '#DEA83A', icon: '🍲' },
    { id: 3, title: 'Good Health', goal: 'Goal 3', color: '#4CA146', icon: '❤️' },
    { id: 4, title: 'Quality Education', goal: 'Goal 4', color: '#C7212F', icon: '📘' },
    { id: 5, title: 'Gender Equality', goal: 'Goal 5', color: '#EF402D', icon: '⚧' },
    { id: 6, title: 'Clean Water', goal: 'Goal 6', color: '#27BFE6', icon: '💧' },
    { id: 7, title: 'Affordable Energy', goal: 'Goal 7', color: '#FBC412', icon: '☀️' },
    { id: 8, title: 'Decent Work', goal: 'Goal 8', color: '#A31C44', icon: '📈' },
  ]; 
  const filteredGoals = goalsData.filter((goal) =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
        <Helmet>
                <title>Goals</title>
            </Helmet>
        <Sidebar />
        <div className="main-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="goals-grid">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              goal={goal.goal}
              color={goal.color}
              icon={goal.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goals;