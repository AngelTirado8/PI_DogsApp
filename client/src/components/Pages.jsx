import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Pages.module.css";

const Pages = ({ dogsPerPage, pages }) => {
  const actualDogs = useSelector((state) => state.allDogs);
  const actualPage = useSelector((state) => state.actualPage);
  const minPageNumber = useSelector((state) => state.minPageNumber);
  const maxPageNumber = useSelector((state) => state.maxPageNumber);

  const pageNumbers = [];
  const indexPageNumbers = Math.ceil((Array.isArray(actualDogs) ? actualDogs.length : 1) / dogsPerPage);
  for (let i = 1; i <= indexPageNumbers; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => actualPage - 1 && pages(actualPage - 1);
  const handleNext = () => actualPage !== pageNumbers.length && pages(actualPage + 1);

  return (
    <ul className={styles.pages}>
      <li
        className={actualPage === 1 ? `${styles.pageNumber} ${styles.disabled}` : styles.pageNumber}
        onClick={handlePrev}
      >
        Prev
      </li>
      {pageNumbers.slice(minPageNumber, maxPageNumber).map((num) => (
        <li
          className={actualPage === num ? `${styles.pageNumber} ${styles.activePage}` : styles.pageNumber}
          key={num}
          onClick={() => pages(num)}
        >
          {num}
        </li>
      ))}
      <li
        className={actualPage === pageNumbers.length ? `${styles.pageNumber} ${styles.disabled}` : styles.pageNumber}
        onClick={handleNext}
      >
        Next
      </li>
    </ul>
  );
};

export default Pages;
