import React, { useState } from "react";
import "./Movie.css";
import poster from "../../assets/cinema_poster.jpg";

function Movie({ movie, setModalShow, setMovieSelected }) {
  return (
    <div
      className="movie shadow animate__animated animate__fadeIn rounded-4 position-relative"
      onClick={() => {
        setMovieSelected(movie);
        setModalShow(true);
      }}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-100 rounded-4 poster-movie"
        />
      ) : (
        <div className="w-100 position-relative">
          <img
            src={poster}
            height={"100%"}
            width={"100%"}
            alt={movie.title}
            className="rounded-4 poster-movie"
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
