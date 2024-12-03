import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage'; // Import FavoritesPage
import { FavoritesProvider } from './context/FavoritesContext';
import axios from 'axios';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const fetchDiscoveryMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: import.meta.env.VITE_MOVIE_API_KEY,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching discovery movies:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_MOVIE_API_KEY,
          query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      fetchDiscoveryMovies();
    }
  }, [location]);

  return (
    <FavoritesProvider>
      <div className="App">
        <Header onSearch={handleSearch} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage movies={movies} />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;
