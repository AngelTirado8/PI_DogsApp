import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament, filterCreated, setActualPage, setMaxPageNumber, setMinPageNumber } from "../redux/actions";
import styles from '../styles/Filters.module.css'

function Filters() {
  const temperamentsState = useSelector(state => state.temperaments)

  const dispatch = useDispatch();
  
  const handleFilterCreated = (e) =>{
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    dispatch(filterCreated(e.target.value))
  }
  
  const handleFilterTemperaments = (e) =>{
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    dispatch(filterByTemperament(e.target.value))
  }

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterTitle}>Filter by: </span>
      <select defaultValue='DEFAULT' onChange={(e) => handleFilterTemperaments(e)}>
        <option value="DEFAULT" disabled>Temperament</option>
        <option key={0} value="All">All</option>
        {temperamentsState.length
          ? temperamentsState.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))
          : null}
      </select>

      <select defaultValue='DEFAULT' onChange={(e) => handleFilterCreated(e)}>
        <option value="DEFAULT" disabled>Creation</option>
        <option value="all">All dogs</option>
        <option value="created">Created</option>
        <option value="api">API</option>
      </select>
    </div>
);
}

export default Filters;