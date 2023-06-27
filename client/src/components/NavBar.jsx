import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <h1 className={styles.navTitle}>
          <Link to="/home">The Dog House</Link>
        </h1>
      </div>
      <SearchBar />
    </nav>
  );
};

export default Nav;





