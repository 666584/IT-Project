import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import GoalCard from './components/GoalCard';
import './App.css';


const goalsData = [
  { id: 1, title: 'No Poverty', goal: 'Goal 1', color: '#E74C3C', icon: '🧑‍🤝‍🧑' },
  { id: 2, title: 'Zero Hunger', goal: 'Goal 2', color: '#F1C40F', icon: '🍲' },
  { id: 3, title: 'Good Health', goal: 'Goal 3', color: '#27AE60', icon: '❤️' },
  { id: 4, title: 'Quality Education', goal: 'Goal 4', color: '#C0392B', icon: '📘' },
  { id: 5, title: 'Gender Equality', goal: 'Goal 5', color: '#E67E22', icon: '⚧' },
  { id: 6, title: 'Clean Water', goal: 'Goal 6', color: '#1ABC9C', icon: '💧' },
  { id: 7, title: 'Affordable Energy', goal: 'Goal 7', color: '#F39C12', icon: '☀️' },
  { id: 8, title: 'Decent Work', goal: 'Goal 8', color: '#8E44AD', icon: '📈' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGoals = goalsData.filter((goal) =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="goals-grid">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id} title={goal.title} goal={goal.goal} color={goal.color} icon={goal.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
