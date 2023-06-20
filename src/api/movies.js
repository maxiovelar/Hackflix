import axios from "axios";

const getMovieConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
  },
};

const getMoviesConfig = {
  ...getMovieConfig,
  params: {
    ...getMovieConfig.params,
    page: 1,
    include_adult: false,
    "vote_count.gte": 200,
  },
};

export const getMovies = async ({
  currentPage,
  setPage,
  movies,
  setMovies,
}) => {
  getMoviesConfig.params.page = currentPage;

  try {
    const { data } = await axios.get("discover/movie", getMoviesConfig);
    setMovies([...movies, ...data.results]);
    setPage(currentPage + 1);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const filterMovies = async ({
  newTitle = null,
  currentPage,
  setPage,
  setMovies,
  newRating = null,
}) => {
  const filterMoviesConfig = {
    ...getMoviesConfig,
    params: {
      ...getMoviesConfig.params,
      query: newTitle,
      "vote_average.gte": newRating * 2 - 0.99,
      page: currentPage,
    },
  };

  try {
    const { data } = await axios.get(
      newTitle ? "search/movie" : "discover/movie",
      filterMoviesConfig
    );
    currentPage > 1
      ? setMovies((prev) => [...prev, ...data.results])
      : setMovies(data.results);

    setPage(currentPage + 1);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const getMovie = async (movieId, setSingleMovie) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, getMovieConfig);
    setSingleMovie(data);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const getCarouselMovies = async (setCarouselMovies) => {
  const getCarouselMoviesConfig = {
    ...getMoviesConfig,
    params: {
      ...getMoviesConfig.params,
      sort_by: "vote_count.desc",
      with_watch_monetization_types: "flatrate",
      include_video: false,
    },
  };
  try {
    const { data } = await axios.get("discover/movie", getCarouselMoviesConfig);
    setCarouselMovies(data.results);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
