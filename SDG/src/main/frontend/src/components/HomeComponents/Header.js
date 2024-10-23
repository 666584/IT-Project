import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Header.module.css';
import logo from './Icons/Logo.png';

function Header() {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SDG Logo" className={styles.logo} />
        <span className={styles.logoText}>Sustainability<br />Development Goals</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.login} onClick={handleLoginClick}>Log in</button>
        <button className={styles.signup} onClick={handleSignupClick}>Sign up</button>
      </div>
    </header>
  );
}

export default Header;
