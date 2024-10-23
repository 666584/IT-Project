import React from 'react';
import styles from './ComicSection.module.css';
import comicImage from './Icons/comic.png';

function ComicSection() {
  return (
    <section className={styles.comicSection}>
      <div className={styles.text}>
        <h2>Interactive Comic Book Modules</h2>
        <p>Learn about sustainability in a fun and engaging way! Our comic book-style modules guide you through each SDG with stories, interactive quizzes, and challenges that make learning exciting.</p>
      </div>
      <img src={comicImage} alt="Comic Book" className={styles.comicImage} />
    </section>
  );
}

export default ComicSection;
