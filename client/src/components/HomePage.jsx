import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  setActualPage,
  setMaxPageNumber,
  setMinPageNumber,
  filterByTemperament
} from "../redux/actions";
import Filters from "./Filters.jsx";
import Sort from '../components/Sort'
import Card from "./Card.jsx";
import Pages from "./Pages.jsx";
import Nav from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import Loader from "../components/Loader";
import Error404 from "./Error404";
import noDog from '../assets/no-dog.svg'
import styles from "../styles/HomePage.module.css";


const HomePage = () => {
  const dispatch = useDispatch();
  const appTopRef = useRef();
  const allDogs = useSelector(state => state.allDogs);
  const [, setOrder] = useState("");
  const actualPage = useSelector(state => state.actualPage);
  const dogsPerPage = 8;
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const actualDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const minPageNumber = useSelector(state => state.minPageNumber);
  const maxPageNumber = useSelector(state => state.maxPageNumber);
  const [selectedTemperament, setSelectedTemperament] = useState("all");
  // const dogs = useSelector(state => state.dogs);

  // const dogNotFound = actualDogs.length === 0;


  const pages = (pageNumber) => {
    dispatch(setActualPage(pageNumber));
    appTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (pageNumber >= maxPageNumber) {
      dispatch(setMinPageNumber(minPageNumber + 4));
      dispatch(setMaxPageNumber(maxPageNumber + 4));
    } else if (pageNumber <= minPageNumber + 1 && pageNumber !== 1) {
      dispatch(setMinPageNumber(minPageNumber - 4));
      dispatch(setMaxPageNumber(maxPageNumber - 4));
    }
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(setActualPage(1));
    dispatch(setMinPageNumber(0));
    dispatch(setMaxPageNumber(5));
    dispatch(getDogs());
    setSelectedTemperament("all");
  };

// ...

//   const handleFilterByTemperament = (temperament) => {
//   setSelectedTemperament(temperament);
//   dispatch(filterByTemperament(temperament, allDogs)); // Pasar 'allDogs' como argumento
// };

// ...

  return (
    <div ref={appTopRef} className={styles.app}>
      <Nav />
      <div className={styles.homeContainer}>
        <div className={styles.sortFilterContainer}>
          <div className={styles.sortFilter}>
            <Filters />
            <Sort setOrder={setOrder} />
          </div>
          <button className={styles.homeRefreshBtn} onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        <div className={styles.createDog}>
          Create your original dog breed&nbsp;
          <Link to="/dogs">here</Link>!
        </div>

          {console.log(actualDogs)}
        <div className={styles.cardContainer}>
          {actualDogs.length && Array.isArray(actualDogs) ? (
            actualDogs.map((dog) => (
             
              <Card
                id={dog.id}
                key={dog.id}
                name={dog.name}
                image={dog.reference_image_id || dog.image}
                imageurl={dog.image?.url}
                weight={dog.weight.imperial || dog.weight}
                temperaments={dog.temperament ? dog.temperament : dog.Temperaments ? dog.Temperaments.map(temp=> temp.name).join(", "):"Not Found!"}
              />
            ))
          ) : (
            !actualDogs.length ? <Loader /> :
            <div className={styles.homeDogNotFound}>
              <img width={150} src={noDog} alt="" />
              <h3>Dog not found :( </h3>
            </div>
          )}
        </div>

        <div className={styles.pagesContainer}>
          <Pages
            pages={pages}
            actualPage={actualPage}
            dogsPerPage={dogsPerPage}
            dogs={allDogs.length}
            minPageNumber={minPageNumber}
            maxPageNumber={maxPageNumber}
          />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

