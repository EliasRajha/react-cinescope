import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useFetch - A reusable hook to fetch data using Axios
 * 
 * @param {string} url - The API endpoint to fetch from
 * @param {object} params - Optional query parameters (merged with API key)
 * 
 * @returns {object} { data, loading, error }
 */
const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);     // Response data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params: {
            api_key: import.meta.env.VITE_MOVIE_API_KEY,
            ...params,
          },
        });
        if (isMounted) setData(response.data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(params)]); // Track URL and param changes

  return { data, loading, error };
};

export default useFetch;
