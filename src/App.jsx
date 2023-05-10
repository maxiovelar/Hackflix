import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import FilterByTitle from "./pages/FilterByTitle";
import FilterByRating from "./pages/FilterByRating";
import SingleMovie from "./pages/SingleMovie";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-by-title" element={<FilterByTitle />} />
          <Route path="/search-by-rating" element={<FilterByRating />} />
        </Route>
        <Route path="/movie/:id" element={<SingleMovie />} />
      </Routes>
    </Layout>
  );
}

export default App;
