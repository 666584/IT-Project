import React from 'react';
import styles from './DashboardSection.module.css';
import dashboardImage from './Icons/Student-Dashboard.png';

function DashboardSection() {
  return (
    <section className={styles.dashboardSection}>
      <img src={dashboardImage} alt="Dashboard" className={styles.dashboardImage} />
      <div className={styles.text}>
        <h2>Personalized Dashboard</h2>
        <p>Track your progress, and manage your sustainability journey all in one place. Get insights on completed modules, quizzes, and set your personal sustainability goals.</p>
      </div>
    </section>
  );
}

export default DashboardSection;
