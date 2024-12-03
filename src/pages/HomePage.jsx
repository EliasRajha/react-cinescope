import React from 'react';
import MovieList from '../components/MovieList';

const HomePage = ({ movies }) => {
  return (
    <div>
      <h2>Welcome to CineScope</h2>
      <MovieList movies={movies} /> {/* Render MovieList with movies */}
    </div>
  );
};

export default HomePage;
