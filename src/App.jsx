import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Global state provider for favorites
import { FavoritesProvider } from './context/FavoritesContext';

// Layout components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

// API service functions
import {
  fetchDiscoveryMovies,
  fetchGenres,
  searchMovies,
} from './services/tmdb';

// Global styles
import './styles/index.css';

function App() {
  const location = useLocation(); // Needed to check current route
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Fetch discovery movies + genres only on homepage
  useEffect(() => {
    if (location.pathname === '/') {
      fetchDiscoveryMovies().then((res) => setMovies(res.data.results));
      fetchGenres().then((res) => setGenres(res.data.genres));
    }
  }, [location]);

  // Handle search queries from SearchBar
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    const res = await searchMovies(query);
    setMovies(res.data.results);
  };

  // Handle genre filter
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Filter movies by selected genre (if any)
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  return (
    <FavoritesProvider>
      <div className="App">
        {/* Top navigation + search bar */}
        <Header onSearch={handleSearch} />

        <div className="main-content">
          <Routes>
            {/* Homepage with discovery + filtering */}
            <Route
              path="/"
              element={
                <HomePage
                  movies={filteredMovies}
                  genres={genres}
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
              }
            />

            {/* Movie details page */}
            <Route path="/movie/:id" element={<MovieDetailPage />} />

            {/* Favorites page */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;
