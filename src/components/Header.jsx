import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import cineScopeLogo from '../logo/cineScopeLogo.png';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      {/* Use the imported logo */}
      <img 
        src={cineScopeLogo} 
        alt="CineScope Logo" 
        className="logo" 
        onClick={() => navigate('/')}
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link> {/* Added the Favorites link */}
      </nav>
      <div>
        <button className="theme-toggle" onClick={handleThemeToggle}>
          {theme === 'dark' ? '🌞' : '🌙'} {/* Switch between sun and moon icon */}
        </button>
      </div>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
