import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearDetail, deleteDog } from "../redux/actions";
import svgArr from '../assets/svg-arrow.svg'
import noDog from '../assets/no-dog.svg'
import styles from '../styles/Detail.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const details = useSelector(state => state.details)
  
  //component did mount/update
  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch, id])

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [dispatch])

  const handleDeleteDog = () => {
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this dog?',
      text: "You won't be able to revert this.",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it',
      denyButtonText: 'No, cancel',
      confirmButtonColor: "var(--clr-orange)",
      denyButtonColor: "var(--clr-light-brown)",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDog(id));
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!', 
          text: 'The dog was successfully deleted from existence.', 
          confirmButtonColor: "var(--clr-orange)",
        })
        navigate("/home");
      } else if (result.isDenied) {
        MySwal.fire({
          icon: 'error',
          title: 'Cancelled', 
          text: 'The dog is safe!', 
          confirmButtonColor: "var(--clr-orange)",
        })
      }
    })
  }
  
  const handleEditDog = () => navigate(`/dogs/${id}/edit`);

  const handleGoBack = () => navigate(-1)
  
  return (
    <div className={styles.detail}>
      <div className={styles.detailContainer}>
        <button onClick={handleGoBack} className={styles.backbtn}>
          <img src={svgArr} alt='Go back'/>
        </button>
      {
        Object.keys(details).length && typeof details !== 'string' ? (
          <div className={styles.detailBody}>
            <img className={styles.detailImg} src={`https://cdn2.thedogapi.com/images/${details.reference_image_id}.jpg`} alt={details.name + ' img'} /> 
              {console.log(details)}
            <div className={styles.detailDescription}>
              <h1 className={styles.detailTitle}>{details.name}</h1>
              <h3 className={styles.detailAboutme}>About me</h3>
              <p><span className={styles.detailCategory}>Height: </span>{details.height?.imperial} cm</p>
              <p><span className={styles.detailCategory}>Weight: </span>{details.weight?.imperial} kg</p>
              {details.life_span && details.life_span[0] !== ' '
                ? <p><span className={styles.detailCategory}>Life span: </span>{details.life_span}</p>
                : null}
                {/* <p>My temperaments are:{details.temperament}</p> */}

              {/* dogs created in db */}
              {Array.isArray(details.temperaments) && details.temperaments.length
                ? <p>My temperament is: {details.temperament.map(t => Object.values(t)).join(', ')}.</p>
                : null}
              {/* dogs api */}
              {typeof details.temperament === 'string' && details.temperament.length
                ? <p>{details.temperament.length ? `My temperament is: ${details.temperament}.` : null}</p>
                : null}
                
              <div className={styles.detailDeleteEditBtnContainer}>
                {details.createdInDB && <button className={styles.detailDeleteEditBtn} onClick={handleEditDog}>Edit</button>}
                {details.createdInDB && <button className="detailDeleteEditBtn detailDeleteBtn" onClick={handleDeleteDog}>Delete</button>}
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(details) 
          ? <h3>Loading...</h3> 
          : <div className="detailBody"><img className="detailDogNotFoundImg" src={noDog} alt="Dog not found img" /><h1 className="detailDogNotFoundTitle">Dog not found :(</h1></div>
        )
      }
      </div>
    </div>
  );
};

export default Detail;