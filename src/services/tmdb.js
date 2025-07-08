// 1. Import Axios for HTTP requests
import axios from 'axios';

// 2. Create a pre-configured Axios instance with base URL and API key
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_MOVIE_API_KEY,
  },
});

// 3. Fetch a list of popular/discoverable movies
export const fetchDiscoveryMovies = () => api.get('/discover/movie');

// 4. Fetch available movie genres
export const fetchGenres = () => api.get('/genre/movie/list');

// 5. Search for movies using a query string
export const searchMovies = (query) =>
  api.get('/search/movie', {
    params: { query },
  });

// 6. Get detailed info about a single movie
export const fetchMovieDetails = (id) => api.get(`/movie/${id}`);

// 7. Get credits (cast & crew) for a movie
export const fetchMovieCredits = (id) => api.get(`/movie/${id}/credits`);

// 8. Get images related to a movie (backdrops, posters)
export const fetchMovieImages = (id) => api.get(`/movie/${id}/images`);
