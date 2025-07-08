import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      {/* === 404 Error Message === */}
      <h1>404 - Page Not Found</h1>
      
      {/* === Optional Description === */}
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      
      {/* === Navigation Link Back to Home === */}
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
