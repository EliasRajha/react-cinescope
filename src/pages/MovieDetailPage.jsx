import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieImages,
} from '../services/tmdb';

import '../styles/components/MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();

  // 1. Local state
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch movie data on mount
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [movieRes, castRes, imageRes] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieImages(id),
        ]);

        setMovie(movieRes.data);
        setCast(castRes.data.cast);
        setImages(imageRes.data.backdrops);
      } catch (err) {
        console.error('Error loading movie details:', err);
        setError('Failed to load movie data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // 3. Show loader or error
  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  // 4. Format data
  const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropPath = images.length
    ? `https://image.tmdb.org/t/p/w1280${images[0].file_path}`
    : null;

  return (
    <div className="movie-detail-page">
      {/* === Backdrop Header === */}
      <div
        className="movie-header"
        style={{ backgroundImage: `url(${backdropPath})` }}
      >
        <div className="movie-header-content">
          <h2>{movie.title}</h2>
          <p>{movie.release_date?.split('-')[0] || 'Unknown Year'}</p>
        </div>
      </div>

      {/* === Main Content === */}
      <div className="movie-details-container">
        {/* Poster */}
        <div className="movie-poster">
          <img src={posterPath} alt={movie.title} />
        </div>

        {/* Info */}
        <div className="movie-info">
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          {/* Cast */}
          <h3>Cast</h3>
          <div className="cast-list">
            {cast.slice(0, 8).map((actor) => (
              <div key={actor.cast_id || actor.id} className="actor">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : 'https://via.placeholder.com/100x100?text=No+Image'
                  }
                  alt={actor.name}
                  className="actor-image"
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Backdrop Images === */}
      <div className="movie-images">
        <h3>Images</h3>
        <div className="image-gallery">
          {images.slice(0, 5).map((image) => (
            <img
              key={image.file_path}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={`Still from ${movie.title}`}
              className="movie-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
