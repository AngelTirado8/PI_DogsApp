import React from 'react';
import { Link } from 'react-router-dom';
import videoLanding from '../assets/videolanding.mp4';
import styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
    <div className={styles.container}>
        <video className={styles.video} autoPlay loop muted>
        <source src={videoLanding} type="video/mp4" />
        </video>
    <div className={styles.content}>
        <h1 className={styles.title}>The dogs house</h1>
        <Link to="/home" className={styles.button}>
            Ingresar
        </Link>
        </div>
        
    </div>
  );
}

export default LandingPage;
