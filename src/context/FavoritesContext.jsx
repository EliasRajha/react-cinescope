import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context
const FavoritesContext = createContext();

// 2. Provider component to wrap your app and provide state
export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage on initial load
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // 3. Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 4. Toggle a movie's presence in favorites
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((fav) => fav.id === movie.id);
      return exists
        ? prevFavorites.filter((fav) => fav.id !== movie.id) // Remove
        : [...prevFavorites, movie]; // Add
    });
  };

  // 5. Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // 6. Provide the context value
  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// 7. Custom hook for easy use of the context
export const useFavorites = () => useContext(FavoritesContext);
