import React, { useState } from 'react';
import './Sidebar.css';
import profileIcon from '../../assets/profile.svg';
import homeIcon from '../../assets/home-2.svg';
import socialIcon from '../../assets/people.svg';
import gameIcon from '../../assets/gameboy.svg';
import moduleIcon from '../../assets/category.svg';
import logoutIcon from'../../assets/logout.png'
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../services/AuthAPI.js'


function Sidebar() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleProfileClick = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');                  
    try {
        const response = await AuthAPI.auth({ accessToken });            
        navigate(`/profile/${response.data}`);    
    }catch (error) {
        setMessage('Invalid credentials');
    }
};

  const handleDashboardClick = async (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem('accessToken');                  
      try {
          const response = await AuthAPI.auth({ accessToken });            
          navigate(`/dashboard/${response.data}`);    
      }catch (error) {
          setMessage('Invalid credentials');
      }
  };

  const handleLogout = () => {    
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <ul className="allIcons">
        <li>
          <button className="sidebar-profile"onClick={handleProfileClick}>
            <img src={profileIcon} alt="Profile" />
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={handleDashboardClick}>
            <img src={homeIcon} alt="Dashboard" />
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/module')}>
            <img src={moduleIcon} alt="Modules" />
            <span>Modules</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/games')}>
            <img src={gameIcon} alt="Games" />
            <span>Games</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={() => navigate('/social')}>
            <img src={socialIcon} alt="Social" />
            <span>Social</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" />
            <span>Logout</span>
          </button>
        </li>

      </ul>
    </div>
    
  );
}

export default Sidebar;
