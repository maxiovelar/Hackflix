import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import "./SingleMovie.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "classnames";
import { getMovie } from "../api/movies";

function SingleMovie() {
  const [singleMovie, setSingleMovie] = useState({});
  const { id: movieId } = useParams();
  const notify = () =>
    toast.info("This function is beyond the scope of this project.");

  const is4K = Number(singleMovie?.release_date?.slice(0, 4)) >= 2016;

  useEffect(() => {
    window.scrollTo(0, -5);
  }, []);

  useEffect(() => {
    getMovie(movieId, setSingleMovie);
  }, [movieId]);

  console.log(singleMovie);

  return (
    <div className="bg-black overflow-hidden movie-content animate__animated animate__fadeIn">
      <div className="animate__animated animate__fadeIn">
        <div className="d-flex main-movie-content">
          <div className="flex-shrink-0 poster-container">
            <img
              src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}/w500/${singleMovie.poster_path}`}
              alt={singleMovie.title}
              className="movie-page-img-size img-fluid"
            />
          </div>
          <div className="flex-grow-1 p-3 p-md-4 p-lg-5">
            <h1 className="text-white fw-bold">
              {singleMovie.title}
              <i
                className={cn("bi text-orange fs-4 ms-2", {
                  "bi-badge-hd": !is4K,
                  "bi-badge-4k": is4K,
                })}
              ></i>
            </h1>
            <h2 className="text-white h3">Overview:</h2>
            <div className="text-white overflow-auto">
              {singleMovie.overview}
            </div>
            <div className="text-white"></div>
            <div className="d-flex flex-column w-100 h-100 px-0 mt-3">
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
              <video
                controls
                className="movie-player mt-4 pointer"
                title="This function is beyond the scope of this project"
                onClick={notify}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default SingleMovie;
