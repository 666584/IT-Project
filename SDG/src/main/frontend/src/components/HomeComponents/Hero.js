import React from 'react';
import styles from './Hero.module.css';
import heroImage from './Icons/image.png';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Empowering students for a more sustainable future</h1>
        <p>A web app that engages students with SDGs through learning modules, quizzes, and rewards.</p>
        <button className={styles.learnMore}>Learn more</button>
      </div>
      <img src={heroImage} alt="17 SDG" className={styles.heroImage} />
    </section>
  );
}

export default Hero;
