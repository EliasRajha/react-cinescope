import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/components/MovieCard.css';

const MovieCard = ({ movie }) => {
  // 1. Build full image path for the poster
  const posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  // 2. Access favorites state and toggler from context
  const { favorites, toggleFavorite } = useFavorites();

  // 3. Check if the current movie is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-card">
      {/* 4. Wrap movie image and title in a link to its detail page */}
      <Link to={`/movie/${movie.id}`}>
        <img
          src={posterPath}
          alt={movie.title || movie.name || 'Movie Poster'}
          className="movie-image"
        />
        <h3 className="movie-title">{movie.title || movie.name}</h3>
      </Link>

      {/* 5. Heart toggle button for adding/removing from favorites */}
      <button
        className={`heart-button ${isFavorite ? 'liked' : ''}`}
        onClick={(e) => {
          e.preventDefault();    // prevent Link navigation
          e.stopPropagation();   // prevent bubbling to Link
          toggleFavorite(movie);
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        ♥
      </button>
    </div>
  );
};

export default MovieCard;
