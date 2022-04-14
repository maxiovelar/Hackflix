import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating";
import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";

function FilterByRating() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);

  function handleScroll() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight - 700
    ) {
      setPageCounter((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setPageCounter(1);
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=8836ccc55842255d5b53cba76a1d1014&language=en-US&vote_average.gte=${
            rating * 2 - 0.99
          }&page=${pageCounter}&vote_count.gte=50&include_adult=false`
        )
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      setMovies(data.results);
    };
    console.log(rating, pageCounter);
    rating && getMovies();
  }, [rating]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=8836ccc55842255d5b53cba76a1d1014&language=en-US&vote_average.gte=${
            rating * 2 - 0.99
          }&page=${pageCounter}&vote_count.gte=50&include_adult=false`
        )
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      setMovies((prev) => [...prev, ...data.results]);
    };
    console.log(rating, pageCounter);
    rating && getMovies();
  }, [pageCounter]);

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center my-4">
        <div className="d-flex align-items-center text-light">
          <span className="me-2 fs-5">Search by rating:</span>
          <Rating
            emptySymbol="bi bi-star text-orange fs-4"
            fullSymbol="bi bi-star-fill text-orange fs-4"
            initialRating={rating}
            onChange={(newRating) => {
              setRating(newRating);
              console.log(rating);
            }}
          />
        </div>
      </div>
      <div className="container movies-container animate__animated animate__fadeIn">
        <div className="row gy-4 gx-2">
          {movies.length &&
            rating &&
            movies.map((movie) => (
              <div
                key={movie.id + Math.random()}
                className="col-4 col-sm-3 col-md-3 col-lg-2"
              >
                <Movie
                  movie={movie}
                  setMovieSelected={setMovieSelected}
                  setModalShow={setModalShow}
                />
              </div>
            ))}
          {!movies.length && rating && (
            <div
              className="alert bg-orange text-white mt-5 fs-5 text-center"
              role="alert"
            >
              There are no results for your search
            </div>
          )}
        </div>

        <MovieModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          movieSelected={movieSelected}
        />
      </div>
    </div>
  );
}

export default FilterByRating;
