import React from 'react';
import './Sidebar.css';
import homeIcon from './icons/home-2.svg';
import socialIcon from './icons/people.svg';
import gameIcon from './icons/gameboy.svg';
import moduleIcon from './icons/category.svg';
import { useNavigate, Link } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {    
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <ul className="allIcons">
        <li>
          <button className="sidebar-button" onClick={() => navigate('/')}>
            <img src={homeIcon} alt="Home" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/')}>
            <img src={moduleIcon} alt="Modules" />
            <span>Modules</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/')}>
            <img src={gameIcon} alt="Games" />
            <span>Games</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/')}>
            <img src={socialIcon} alt="Social" />
            <span>Social</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={handleLogout}>
            <img src={socialIcon} alt="Social" />
            <span>logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
