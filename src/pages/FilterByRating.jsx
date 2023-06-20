import { useEffect, useState } from "react";
import Rating from "react-rating";
import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import "./FilterByRating.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { filterMovies } from "../api/movies";
import { Loader } from "../components/loader/Loader";

function FilterByRating() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [rating]);

  useEffect(() => {
    if (page === 1 && rating !== 0) {
      filterMovies({
        currentPage: page,
        setPage: setPage,
        setMovies: setMovies,
        newRating: rating,
      });
    }
  }, [rating, page]);

  const handleInfiniteScroll = () => {
    filterMovies({
      currentPage: page,
      setPage: setPage,
      setMovies: setMovies,
      newRating: rating,
    });
  };

  return (
    <div className="mb-5">
      <div className="container rating-box d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center text-light">
          <span className="me-2 fs-5">Search by rating:</span>
          <Rating
            emptySymbol="bi bi-star text-orange fs-4"
            fullSymbol="bi bi-star-fill text-orange fs-4"
            initialRating={rating}
            onChange={(newRating) => {
              setRating(newRating);
            }}
          />
        </div>
      </div>
      <div className="container animate__animated animate__fadeIn">
        <ScrollToTop movies={movies} />
        <div className="row gy-4 gx-2 animate__animated animate__fadeIn">
          {movies.length > 0 && rating !== 0 && (
            <InfiniteScroll
              dataLength={movies.length}
              next={handleInfiniteScroll}
              hasMore={true}
              loader={
                <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                  <Loader />
                </div>
              }
              className="row gy-4 gx-2 animate__animated animate__fadeIn overflow-visible"
            >
              {movies.map((movie) => (
                <div
                  key={movie.id + Math.random()}
                  className="col-4 col-sm-3 col-md-3 col-lg-2 animate__animated animate__fadeIn"
                >
                  <Movie
                    movie={movie}
                    setMovieSelected={setMovieSelected}
                    setModalShow={setModalShow}
                  />
                </div>
              ))}
            </InfiniteScroll>
          )}
          {!movies.length > 0 && rating !== 0 && (
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
