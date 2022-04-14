import React, { useState } from "react";
import "./Movie.css";
import poster from "../../assets/cinema_poster.jpg";
import { Spinner } from "react-bootstrap";

function Movie({ movie, setModalShow, setMovieSelected }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className="movie shadow animate__animated animate__fadeIn rounded-4 position-relative"
      onClick={() => {
        setMovieSelected(movie);
        setModalShow(true);
      }}
    >
      {isLoading &&
        <div className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
          <Spinner animation="grow" variant="secondary" size="sm" />
          <Spinner animation="grow" variant="secondary" size="sm" className="mx-1" />
          <Spinner animation="grow" variant="secondary" size="sm" />
        </div>}
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-100 rounded-4 poster-movie"
          onLoad={() => {setIsLoading(false)}}
        />
      ) : (
        <div className="w-100 position-relative">
          <img
            src={poster}
            height={"100%"}
            width={"100%"}
            alt={movie.title}
            className="rounded-4 poster-movie"
            onLoad={() => {setIsLoading(false)}}
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
