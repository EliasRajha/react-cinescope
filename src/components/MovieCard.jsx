import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterPath} alt={movie.title || movie.name} className="movie-image" />
        <h3 className="movie-title">{movie.title || movie.name}</h3>
      </Link>
      <button
        className={`heart-button ${isFavorite ? 'liked' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); 
          toggleFavorite(movie);
        }}
        aria-label="Like or unlike movie"
      >
        ♥
      </button>
    </div>
  );
};

export default MovieCard;
