import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDogs, getTemperaments } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import svgArr from "../assets/svg-arrow.svg";
import styles from "../styles/CreateDog.module.css";

// eslint-disable-next-line no-useless-escape
// const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$");

// cb
const validateText = (input) => {
  const err = {};

  if (!input.name) err.name = "Write the name";
  else if (isBlankSpace.test(input.name))
    err.name = "Shouldn't be a blank space";
  else if (input.name.length > 255)
    err.name = "Maximum number of characters: 255";

  if (!input.height) err.height = "Write the min height";
  else if (input.height < 1) err.height = "Should be taller than 1cm";
  else if (isNaN(input.height)) err.height = "Should be a number";

  // if (!input.height_max) err.height_max = 'Write the max height'
  // else if (input.height_max > 500) err.height_max = "Should be smaller than 500cm";
  // else if (isNaN(input.height_max)) err.height_max = "Should be a number";

  // if (input.height && input.height && parseInt(input.height) >= parseInt(input.height)) err.height_max = 'Max height should be bigger than min'

  if (!input.weight) err.weight = "Write the min weight";
  else if (input.weight < 1) err.weight = "Should be heavier than 1kg";
  else if (isNaN(input.weight)) err.weight = "Should be a number";

  // if (!input.weight_max) err.weight_max = "Write the max weight";
  // else if (input.weight_max > 500) err.weight_max = "Should be less heavy than 500kg";
  // else if (isNaN(input.weight_max)) err.weight_max = "Should be a number";

  // if (input.weight_min && input.weight_max && parseInt(input.weight_min) >= parseInt(input.weight_max)) err.weight_max = 'Max weight should be bigger than min'

  // optionals
  // if (input.image && !imgRegexp.test(input.image.trim())) err.image = 'Should be a valid URL'

  if (input.life_span && input.life_span < 1)
    err.life_span = "Min life span should be bigger than 1 year";
  else if (input.life_span && isNaN(input.life_span))
    err.life_span = "Should be a number";

  // if (input.life_span_max && input.life_span_max > 500) err.life_span_max = "Max life span should be smaller than 500 years";
  // else if (input.life_span_max && isNaN(input.life_span_max)) err.life_span_max = "Should be a number";

  if (input.life_span && !input.life_span)
    err.life_span = "Both life spans should be filled";
  // if (!input.life_span_min && input.life_span_max) err.life_span_max = 'Both life spans should be filled'

  if (
    input.life_span_min &&
    input.life_span_max &&
    parseInt(input.life_span_min) >= parseInt(input.life_span_max)
  )
    err.life_span_max = "Max life span should be bigger than min";

  return err;
};

// component
const CreatedDog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temperaments);
  const [tempsDB, setTempsDB] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    image: "",
    life_span: "",

    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.name &&
      !input.weight &&
      !input.height &&
      !Object.keys(errors).length
    ) {
      dispatch(createDogs(input));
      alert("Please complete the form");
    } else if (
      !errors.name &&
      !errors.weight &&
      !errors.height &&
      !errors.image &&
      !errors.life_span
    ) {
      const newDog = {
        ...input,
        name: input.name.trim(),
        image: input.image.trim(),
        temperaments: tempsDB,
      };
      // console.log(newDog);
      dispatch(createDogs(newDog));
      alert("Your dog is ready!\nIf you don't see any changes, please refresh the page.");

      setInput({
        name: "",
        weight: "",
        height: "",
        image: "",
        life_span: "",
        temperaments: [],
      });
      setTempsDB([]);
      navigate("/home");
    } else {
      alert("Please complete the form with the correct data.");
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validateText({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    if (!tempsDB.includes(e.target.value))
      setTempsDB([...tempsDB, e.target.value]);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setTempsDB(tempsDB.filter((temp) => temp !== e.target.value));
  };

  const handleGoBack = () => navigate("/home");

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBody}>
        <button onClick={handleGoBack} className={styles.backBtn}>
          <img src={svgArr} alt="Go back" aria-label="Go back" />
        </button>

        <h2 className={styles.formTitle}>
          Complete the form and create your original breed!{" "}
        </h2>
        <h5 className={styles.formSubtitle}>
          Fields with <span className={styles.obligatory}>*</span> are
          required.
        </h5>

        <form className={styles.formCreation} onSubmit={(e) => handleSubmit(e)}>
          <label className={styles.formLabelTitle}>
            Name <span className={styles.obligatory}>*</span>
          </label>
          <input
            name="name"
            value={input.name}
            placeholder="Breed name"
            onChange={handleChange}
          />
          {errors.name && <p className={styles.formError}>{errors.name}</p>}

          <div className={styles.formDobleInputContainer}>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>
                Height <span className={styles.obligatory}>*</span>
              </label>
              <div>
                <input
                  name="height"
                  value={input.height}
                  placeholder="Min cm"
                  onChange={handleChange}
                  type="number"
                />
                {errors.height && (
                  <p className={styles.formError}>{errors.height}</p>
                )}
              </div>
            </div>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>&nbsp;</label>
            </div>
          </div>

          <div className={styles.formDobleInputContainer}>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>
                Weight <span className={styles.obligatory}>*</span>
              </label>
              <div>
                <input
                  name="weight"
                  value={input.weight}
                  placeholder="Min kg"
                  onChange={handleChange}
                  type="number"
                />
                {errors.weight && (
                  <p className={styles.formError}>{errors.weight}</p>
                )}
              </div>
            </div>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>&nbsp;</label>
            </div>
          </div>

          <div className={styles.formDobleInputContainer}>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>Life span</label>
              <div>
                <input
                  name="life_span"
                  value={input.life_span}
                  placeholder="Min year"
                  onChange={handleChange}
                  type="number"
                />
                {errors.life_span && (
                  <p className={styles.formError}>{errors.life_span}</p>
                )}
              </div>
            </div>
            <div className={styles.formDobleInput}>
              <label className={styles.formLabelTitle}>&nbsp;</label>
            </div>
          </div>

          <label className={styles.formLabelTitle}>Image</label>
          <input
            name="image"
            value={input.image}
            placeholder="Image URL"
            onChange={handleChange}
          />
          {/* {errors.image && (<p className={styles.formError}>{errors.image}</p>)} */}

          <label className={styles.formLabelTitle}>Temperaments</label>
          <select
            defaultValue="DEFAULT"
            name="form-temperaments"
            onChange={handleSelect}
          >
            <option value="DEFAULT" disabled>
              Select temperaments...
            </option>
            {temps.map((temp) => (
              <option
                className={styles.formOption}
                key={temp.name}
                value={temp.name}
              >
                {temp.name}
              </option>
            ))}
          </select>
          <ul className={styles.formTemperamentsSelected}>
            {tempsDB.map((temp, id) => (
              <li className={styles.formTemperamentsSelectedItem} key={id}>
                {temp}
                <button
                  className={styles.formTemperamentsDeleteBtn}
                  value={temp}
                  onClick={(e) => handleDelete(e)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.formSubmitBtn} type="submit">
            Create dog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatedDog;


