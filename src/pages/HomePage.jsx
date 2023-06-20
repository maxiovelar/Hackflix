import Slider from "../components/slider/Slider";
import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import "./HomePage.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovies } from "../api/movies";
import { Loader } from "../components/loader/Loader";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies({
      currentPage: page,
      setPage: setPage,
      movies: movies,
      setMovies: setMovies,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInfiniteScroll = () => {
    getMovies({
      currentPage: page,
      setPage: setPage,
      movies: movies,
      setMovies: setMovies,
    });
  };

  return (
    <div className="animate__animated animate__fadeIn position-relative mb-5">
      <Slider setMovieSelected={setMovieSelected} setModalShow={setModalShow} />
      <ScrollToTop movies={movies} />
      <div className="container movies-container">
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
          {movies.length &&
            movies.map((movie) => (
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
        <MovieModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          movieSelected={movieSelected}
        />
      </div>
    </div>
  );
}

export default HomePage;
