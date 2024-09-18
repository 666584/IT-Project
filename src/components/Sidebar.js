import React from 'react';
import './Sidebar.css';
import homeIcon from './icons/home-2.svg';
import socialIcon from './icons/people.svg';
import gameIcon from './icons/gameboy.svg';
import moduleIcon from './icons/category.svg';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="allIcons">
        <li>
          <button className="sidebar-button">
            <img src={homeIcon} alt="Home" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <img src={moduleIcon} alt="Modules" />
            <span>Modules</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <img src={gameIcon} alt="Games" />
            <span>Games</span>
          </button>
        </li>
        <li>
          <button className="sidebar-button">
            <img src={socialIcon} alt="Social" />
            <span>Social</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
