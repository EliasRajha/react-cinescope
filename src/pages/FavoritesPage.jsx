import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
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
