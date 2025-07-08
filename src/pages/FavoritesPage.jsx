import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import '../styles/components/FavoritesPage.css';

const FavoritesPage = () => {
  // Access favorites and utility functions from context
  const { favorites, clearFavorites } = useFavorites();

  // Handler to confirm before clearing favorites
  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear all favorites?');
    if (confirmed) clearFavorites();
  };

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>

      {/* Show "Clear All" button if there are any favorites */}
      {favorites.length > 0 && (
        <button className="clear-button" onClick={handleClear}>
          ❌ Clear All Favorites
        </button>
      )}

      {/* Render favorite movies or fallback message */}
      {favorites.length > 0 ? (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No favorite movies yet!</p>
      )}
    </div>
  );
};

export default FavoritesPage;
