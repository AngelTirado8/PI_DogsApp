import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.cssLoadWave}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
