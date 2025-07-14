import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

function Home() {
  const [likedMovies, setLikedMovies] = useState([]); // État pour les films favoris
  const [moviesData, setMoviesData] = useState([]); // État pour les données des films

  // Récupération des films au chargement (Mount) du composant
  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => {
        const newMovies = [];
        for (let movie of data.movies) {
          // Limiter la longueur de l'aperçu à 250 caractères
          let overview = movie.overview;
          if (overview.length > 250) {
            overview = overview.substring(0, 250) + "...";
          }
          // Création d'un objet movie avec les données nécessaires
          const newMovie = {
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            overview: overview,
          };
          newMovies.push(newMovie);
        }
        setMoviesData(newMovies);
      });
  }, []);

  // Fonction pour ajouter ou supprimer un film des favoris (inverse dataflow avec Movie.js)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      // Si le film est déjà dans les favoris, on le supprime
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      // Si le film n'est pas dans les favoris, on l'ajoute
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  // Affichage des films récupérés au Mount du composant
  const movies = moviesData.map((data, i) => {
    // Vérifie si le film est dans les favoris
    const isLiked = likedMovies.some((movie) => movie === data.title);

    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies} // Fonction pour ajouter ou supprimer un film des favoris
        isLiked={isLiked}
        title={data.title}
        overview={data.overview}
        poster={data.poster}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
      />
    );
  });

  // Affichage des titres des films favoris dans le popover
  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        {/* Titre du film */}
        <div className="likedMovie">{data}</div>
        {/* Bouton pour supprimer le film des favoris */}
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(data)} // Fonction pour ajouter ou supprimer un film des favoris
          className={styles.crossIcon}
        />
      </div>
    );
  });

  // Contenu du popover avec les films favoris
  const popoverContent = (
    <div className={styles.popoverContent}>{likedMoviesPopover}</div>
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
          placement="bottom"
          overlayStyle={{ marginTop: "10px", zIndex: 2000 }}
        >
          {/* Compteur de films en favoris sur le bouton */}
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      {/* Affichage des films */}
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Home;
