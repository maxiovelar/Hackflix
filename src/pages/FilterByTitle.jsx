import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";
import "./FilterByTitle.css";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import { filterMovies } from "../api/movies";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../components/loader/Loader";

function FilterByTitle() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    title &&
      filterMovies({
        newTitle: title,
        currentPage: page,
        setPage: setPage,
        setMovies: setMovies,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleInfiniteScroll = () => {
    filterMovies({
      newTitle: title,
      currentPage: page,
      setPage: setPage,
      setMovies: setMovies,
    });
  };

  return (
    <div className="mb-5">
      <div className="container search-box d-flex align-items-center justify-content-center">
        <form
          id="form-search-by-title"
          className="input-group d-flex align-items-center bg-black rounded-pill py-1 pe-3"
        >
          <label htmlFor="title" className="visually-hidden">
            Set a title
          </label>
          <span
            className="input-group-text bg-black border-0 me-0"
            id="search-left-side"
          >
            <i className="bi bi-search text-orange"></i>
          </span>
          <input
            type="text"
            id="search"
            value={title}
            className="bg-black text-white border-0 ms-0 py-2 rounded-pill"
            placeholder="search by title"
            autoFocus
            autoComplete="off"
            onChange={(e) => {
              setTitle(e.target.value);
              setPage(1);
            }}
          />
        </form>
      </div>
      <div className="container animate__animated animate__fadeIn">
        <ScrollToTop movies={movies} />
        <div className="row gy-4 gx-2 animate__animated animate__fadeIn">
          {movies.length > 0 && title !== "" && (
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
          {!movies.length && title && (
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

export default FilterByTitle;
