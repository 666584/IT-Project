import React from 'react';
import styles from './VouchersSection.module.css';
import couponImage from './Icons/coupon.png';

function VouchersSection() {
  return (
    <section className={styles.vouchersSection}>
      <img src={couponImage} alt="Vouchers" className={styles.couponImage} />
      <div className={styles.text}>
        <h2>Reward Vouchers</h2>
        <p>Track your progress, and manage your sustainability journey all in one place. Get insights on completed modules, quizzes, and set your personal sustainability goals.</p>
      </div>
    </section>
  );
}

export default VouchersSection;
