import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie/show details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: import.meta.env.VITE_MOVIE_API_KEY,
            language: 'en-US',
          },
        });

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: import.meta.env.VITE_MOVIE_API_KEY,
          },
        });

        const imagesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
          params: {
            api_key: import.meta.env.VITE_MOVIE_API_KEY,
          },
        });

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast);
        setImages(imagesResponse.data.backdrops);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropPath = images.length > 0 ? `https://image.tmdb.org/t/p/w1280${images[0].file_path}` : null;

  return (
    <div className="movie-detail-page">
      <div className="movie-header" style={{ backgroundImage: `url(${backdropPath})` }}>
        <div className="movie-header-content">
          <h2>{movie.title}</h2>
          <p>{movie.release_date ? movie.release_date.split('-')[0] : "Unknown Year"}</p>
        </div>
      </div>

      <div className="movie-details-container">
        <div className="movie-poster">
          <img src={posterPath} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Cast</h3>
          <div className="cast-list">
            {cast.slice(0, 5).map((actor) => (
              <div key={actor.cast_id} className="actor">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="actor-image"
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="movie-images">
        <h3>Images</h3>
        <div className="image-gallery">
          {images.slice(0, 5).map((image) => (
            <img
              key={image.file_path}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={movie.title}
              className="movie-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
