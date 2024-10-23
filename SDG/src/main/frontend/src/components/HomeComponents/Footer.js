import React from 'react';
import styles from './Footer.module.css';
import footerLogo from './Icons/United-Nations-Symbol.jpg';
import facebookIcon from './Icons/facebook.png';
import youtubeIcon from './Icons/youtube.png';
import twitterIcon from './Icons/twiter.png';
import flickrIcon from './Icons/Flickr.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.unContainer}>
          <img src={footerLogo} alt="United Nations Logo" className={styles.footerLogo} />
          <span className={styles.unText}>United<br />Nation</span>
        </div>
        <nav className={styles.navLinks}>
          <a href="#">Contact</a>
          <a href="#">Copyright</a>
          <a href="#">Fraud Alert</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Terms of Use</a>
        </nav>
      </div>

      <div className={styles.joinSection}>
        <h2 className={styles.joinText}>Join the conversation</h2>
        <div className={styles.socialIcons}>
          <img src={facebookIcon} alt="Facebook" className={styles.icon} />
          <img src={twitterIcon} alt="Twitter" className={styles.icon} />
          <img src={youtubeIcon} alt="YouTube" className={styles.icon} />
          <img src={flickrIcon} alt="Flickr" className={styles.icon} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
