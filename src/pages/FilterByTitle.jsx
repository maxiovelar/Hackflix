import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";
import "./FilterByTitle.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer/Footer";

// const axiosConfig = {
//   baseURL: "https://api.themoviedb.org/3/",
//   params: {
//     api_key: "8836ccc55842255d5b53cba76a1d1014",
//     page: 1,
//     include_adult: false,
//     language: "en-US",
//     "vote_count.gte": 15,
//   },
// };

function FilterByTitle() {
  const [title, setTitle] = useState("");
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
      setTitle((prev) => prev);
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
          `https://api.themoviedb.org/3/search/movie?api_key=8836ccc55842255d5b53cba76a1d1014&language=en-US&query=${title}&page=${pageCounter}&vote_average.gte=50&include_adult=false`
        )
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      setMovies(data.results);
    };
    console.log(title, movies);

    getMovies();
  }, [title]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=8836ccc55842255d5b53cba76a1d1014&language=en-US&query=${title}&page=${pageCounter}&vote_average.gte=50&include_adult=false`
        )
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      if (data && data.results) {
        setMovies((prev) => [...prev, ...data.results]);
      }
    };
    console.log(title, movies);

    getMovies();
  }, [pageCounter]);

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center my-4">
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
            autoComplete="off"
            onChange={(e) => {
              setTitle(e.target.value);
              setPageCounter(1);
            }}
          />
        </form>
      </div>
      <div className="container movies-container animate__animated animate__fadeIn">
        <div className="row gy-4 gx-2">
          {movies.length &&
            title !== "" &&
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
