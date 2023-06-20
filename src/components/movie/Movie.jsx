import React from "react";
import "./Movie.css";
import poster from "../../assets/cinema_poster.jpg";

function Movie({ movie, setModalShow, setMovieSelected }) {
  return (
    <div
      className="movie animate__animated animate__fadeIn rounded-4 position-relative"
      onClick={() => {
        setMovieSelected(movie);
        setModalShow(true);
      }}
      title={movie.title}
    >
      {movie.poster_path ? (
        <img
          src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-100 rounded-4 poster-movie"
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="w-100 position-relative">
          <img
            src={poster}
            height={"100%"}
            width={"100%"}
            alt={movie.title}
            className="rounded-4 poster-movie"
            onLoad={() => setIsLoading(false)}
          />
          <span className="d-block position-absolute top-50 start-50 translate-middle text-white">
            {movie.title}
          </span>
        </div>
      )}
    </div>
  );
}

export default Movie;
