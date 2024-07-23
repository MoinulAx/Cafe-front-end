import React from 'react';
import { Link } from 'react-router-dom';
import './errorpage.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
