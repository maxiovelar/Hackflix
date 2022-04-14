import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import Player from "../components/player/Player";
import "./SingleMovie.css";

function SingleMovie() {
  const [singleMovie, setSingleMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, -5);
  }, []);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=8836ccc55842255d5b53cba76a1d1014&language=en-US`
        )
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      console.log(data);
      setSingleMovie(data);
    };
    getMovie();
  }, [params.id]);

  return (
    <div className="bg-black overflow-hidden movie-content">
      <div className="animate__animated animate__fadeIn">
        <div className="d-flex main-movie-content">
          <div className="flex-shrink-0 poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`}
              alt={singleMovie.title}
              className="movie-page-img-size img-fluid"
            />
          </div>
          <div className="flex-grow-1 p-3 p-md-4 p-lg-5">
            <h1 className="text-white fw-bold">
              {singleMovie.title}
              <i className="bi bi-badge-hd text-orange fs-4 ms-2"></i>
            </h1>
            <h2 className="text-white h3">Overview:</h2>
            <div className="text-white overflow-auto">
              {singleMovie.overview}
            </div>
            <div className="text-white">
              {/* {console.log(singleMovie.genres[0].name)} */}
              {/* {singleMovie.genres.map((genre) => (
                <p
                  key={singleMovie.id + Math.random()}
                  className="p-2 bg-dark text-white"
                >
                  {genre.name}
                </p>
              ))} */}
            </div>
            <div className="d-flex flex-column w-100 h-100 px-0 mt-4">
              {/* <span className="text-orange text-shadow me-2 mt-2">
                Genre:
                <span className="text-white ms-1">
                  {singleMovie.genres.item.name}
                </span>
              </span> */}
              <span className="text-orange text-shadow">
                Votes count:
                <span className="text-white text-shadow fs-5 ms-2">
                  {singleMovie.vote_count}
                </span>
              </span>
              <div>
                <span className="text-orange text-shadow me-2 mt-2">
                  Rating:
                </span>
                <Rating
                  emptySymbol="bi bi-star text-orange"
                  fullSymbol="bi bi-star-fill text-orange"
                  quiet={false}
                  readonly={true}
                  initialRating={singleMovie.vote_average / 2}
                  className="mt-2"
                />
              </div>
              <span className="text-orange text-shadow me-2 mt-2">
                Original Language:{" "}
                <span className="text-white ms-1">
                  {singleMovie.original_language}
                </span>
              </span>
              <Player />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
