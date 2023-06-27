import React from "react";
import { useNavigate } from "react-router-dom";
import dogError from '../assets/dog-error.jpg';
import styles from '../styles/Error404.module.css';

const Error404 = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/home');

  return (
    <div className={styles.error404Container}>
      <div className={styles.error404Body}>
        <h1>Error 404: Page not found</h1>
        <img className={styles.error404Img} src={dogError} alt='' />
        <button className={styles.error404Btn} onClick={handleGoHome}>Go Home</button>
      </div>
    </div>
  );
};

export default Error404;
