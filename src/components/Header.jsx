import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../assets/cineScopeLogo.png';
import '../styles/components/Header.css';

const Header = ({ onSearch }) => {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  // Toggle between dark and light themes
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      {/* Logo (clickable) */}
      <img
        src={logo}
        alt="CineScope Logo"
        className="logo"
        onClick={() => navigate('/')}
      />

      {/* Navigation section with theme toggle */}
      <div className="nav-section">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        {/* Theme Toggle Icon */}
        <button className="theme-toggle" onClick={handleThemeToggle}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>

      {/* Search bar */}
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
