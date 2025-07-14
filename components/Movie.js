import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Movie.module.css";

function Movie(props) {
  const [watchCount, setWatchCount] = useState(0); // Compteur de visionnages
  const [personalNote, setPersonalNote] = useState(0); // Evaluation personnelle

  // Création de 10 étoiles pour la note du film
  const stars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < props.voteAverage - 1) {
      // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
      style = { color: "#f1c40f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Création de 10 étoiles CLIQUABLES pour la note personnelle
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { cursor: "pointer" };
    if (i < personalNote) {
      // Si l'indice de l'étoile est inférieur à la note personnelle, on la colore en bleu
      style = { color: "#2196f3", cursor: "pointer" };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => setPersonalNote(i + 1)}
        style={style}
        className="note"
      />
    );
  }

  // Fonction pour compter le nombre de visionnages
  const handleWatchMovie = () => {
    setWatchCount(watchCount + 1);
  };
  let videoIconStyle = { cursor: "pointer" };
  if (watchCount > 0) {
    // Si le film a été visionné au moins une fois, on change la couleur de l'icône caméra en rouge
    videoIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Fonction pour ajouter ou retirer le film des favoris
  const handleLikeMovie = () => {
    props.updateLikedMovies(props.title);
  };
  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    // Si le film est dans les favoris, on change la couleur de l'icône cœur en rouge
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.title} />
      <div className={styles.textContainer}>
        <div>
          <span className={styles.name}>{props.title}</span>
          <p className={styles.description}>{props.overview}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>
            {stars} ({props.voteCount})
          </span>
          <span>
            {personalStars} ({personalNote})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faVideo}
              onClick={() => handleWatchMovie()}
              style={videoIconStyle}
              className="watch"
            />{" "}
            ({watchCount})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => handleLikeMovie()}
              style={heartIconStyle}
              className="like"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
