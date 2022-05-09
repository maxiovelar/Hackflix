import Slider from "../components/slider/Slider";
import Movie from "../components/movie/Movie";
import MovieModal from "../components/movie-modal/MovieModal";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import "./Home.css";
import { Spinner } from "react-bootstrap";

const axiosConfig = {
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "8836ccc55842255d5b53cba76a1d1014",
    page: 1,
    include_adult: false,
    language: "en-US",
    "vote_count.gte": 15,
  },
};

function Home() {
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function handleScroll() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
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
      axiosConfig.params.page = pageCounter;
      const { data } = await axios
        .get("discover/movie", axiosConfig)
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      setMovies((prev) => [...prev, ...data.results]);
    };
    getMovies();
  }, [pageCounter]);

  return (
    <div className="animate__animated animate__fadeIn position-relative">
      <Slider setMovieSelected={setMovieSelected} setModalShow={setModalShow} />
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      <div className="container movies-container">
        <ScrollToTop />
        <div className="row gy-4 gx-2 animate__animated animate__fadeIn">
          {movies.length &&
            movies.map((movie) => (
              <div
                key={movie.id + Math.random()}
                className="col-4 col-sm-3 col-md-3 col-lg-2 animate__animated animate__fadeIn"
                onLoad={() => {
                  setIsLoading(false);
                }}
              >
                <Movie
                  movie={movie}
                  setMovieSelected={setMovieSelected}
                  setModalShow={setModalShow}
                />
              </div>
            ))}
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

export default Home;
