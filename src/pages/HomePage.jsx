import React from 'react';
import MovieList from '../components/MovieList';

const HomePage = ({ movies, genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="home-page">
      {/* === Welcome Header === */}
      <h2>Welcome to CineScope</h2>

      {/* === Genre Filter Dropdown === */}
      {genres.length > 0 && (
        <div className="genre-filter">
          <label htmlFor="genre-select">Filter by Genre: </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* === Movie List Grid === */}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
