import React, { useState } from 'react';
import '../styles/components/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  // 1. Local state to track the search input value
  const [query, setQuery] = useState('');

  // 2. Trigger search if the input is not empty
  const handleSearch = () => {
    if (!query.trim()) return; // prevent empty search
    onSearch(query);
    setQuery(''); // clear input after search
  };

  // 3. Allow user to press Enter to trigger search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search movies or shows"
        aria-label="Search input"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
