import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FilterByTitle from "./pages/FilterByTitle";
import FilterByRating from "./pages/FilterByRating";
import SingleMovie from "./pages/SingleMovie";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="h-100 d-flex flex-column">
      <NavBar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/search-by-title" element={<FilterByTitle />} />
          <Route path="/search-by-rating" element={<FilterByRating />} />
        </Routes>
      </main>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
