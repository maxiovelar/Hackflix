import { QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import FilterByTitle from "./pages/FilterByTitle";
import FilterByRating from "./pages/FilterByRating";
import SingleMovie from "./pages/SingleMovie";
import { Home } from "./pages/Home";
import Layout from "./components/layout/Layout";
import { QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
