import React from 'react';
import MovieCard from './MovieCard'; // Reusable card component for each movie
import '../styles/components/MovieList.css'; // Styles for movie grid layout

/**
 * MovieList Component
 * Renders a list of MovieCard components from a list of movies.
 *
 * @param {Array} movies - Array of movie objects to display
 */
const MovieList = ({ movies }) => {
  // Handle empty or undefined movie list
  if (!movies || movies.length === 0) {
    return <div>No movies found. Try another search.</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
