import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";
import imgbd from '../assets/imgbd/imagenbd.jpeg'

const Card = ({ id, name, image, weight, temperaments, imageurl }) => {
  console.log("imageurl:", imageurl);
  console.log("image:", image);
  console.log("weigth:", weight)
  console.log("name:", name)

  return (
    <Link className={styles.card} to={"/dogs/" + id}>
      {imageurl && image ?<img 
        className={styles.dogImg}
        src={
          imageurl ||
          `https://cdn2.thedogapi.com/images/${image}.jpg`
        }
        alt={name}
        width={300}
        height={190}
      />: <img 
      className={styles.dogImg}
      src={
        image ||imgbd 
      }
      alt={name}
      width={300}
      height={190}
    />}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardWeight}>{weight} kg</p>
        {Array.isArray(temperaments) ? (
          <p className={styles.cardTemperaments}>
            {temperaments.map((t) => Object.values(t)).join(", ")}
          </p>
        ) : (
          <p className={styles.cardTemperaments}>{temperaments}</p>
        )}
      </div>
    </Link>
  );
};

export default Card;


