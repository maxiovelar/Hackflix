import React, { useEffect, useState } from "react";
import "./Slider.css";
import { Carousel } from "react-bootstrap";
import Rating from "react-rating";
import { getCarouselMovies } from "../../api/movies";

function Slider({ setMovieSelected, setModalShow }) {
  const [carouselMovies, setCarouselMovies] = useState([]);

  useEffect(() => {
    getCarouselMovies(setCarouselMovies);
  }, []);

  const handleClick = (movie) => {
    setMovieSelected(movie);
    setModalShow(true);
  };

  return (
    <Carousel
      prevIcon={
        <span aria-hidden="true">
          <i className="bi bi-caret-left-fill fs-1 text-orange"></i>
        </span>
      }
      nextIcon={
        <span aria-hidden="true">
          <i className="bi bi-caret-right-fill fs-1 text-orange"></i>
        </span>
      }
      className="d-none d-lg-block carousel-z-index carousel-mt"
    >
      {carouselMovies.length > 0 &&
        carouselMovies.map(
          (movie, i) =>
            i <= 9 && (
              <Carousel.Item key={movie.id}>
                <div>
                  <div className="img-dark-gradient"></div>
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}/w1280/${movie.backdrop_path}`}
                    className="d-block w-100"
                    alt={movie.tite}
                  />
                </div>
                <Carousel.Caption>
                  <span
                    className="display-3 fw-bold text-shadow mb-5 pointer d-block"
                    onClick={() => {
                      handleClick(movie);
                    }}
                  >
                    {movie.title}
                  </span>
                  <div className="w-100 d-flex align-items-center justify-content-between mb-2">
                    <span className="text-orange text-shadow">
                      Votes count:
                      <span className="text-white text-shadow fs-5 ms-1">
                        {movie.vote_count}
                      </span>
                    </span>
                    <div className="d-flex align-items-center">
                      <span className="text-white text-shadow me-1">
                        Rating:
                      </span>
                      <Rating
                        emptySymbol="bi bi-star text-orange"
                        fullSymbol="bi bi-star-fill text-orange"
                        quiet={false}
                        readonly={true}
                        initialRating={movie.vote_average / 2}
                      />
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            )
        )}
    </Carousel>
  );
}

export default Slider;
