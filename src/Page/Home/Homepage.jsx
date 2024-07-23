import React, { useState } from 'react';

import './home.scss';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
  

  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to LaManRis Café</h1>
       
      </header>
      <section className="about">
        <h2>About Us</h2>
        <p>LaManRis Café is dedicated to providing the best coffee and pastries in town. Our mission is to serve our community with a smile and ensure a warm and welcoming atmosphere for all our guests. Join us for a cup of coffee and a friendly chat!</p>
      </section>
      <section className="order">
        <h2>Order Now</h2>
        <p>Choose your favorite items and have them shipped to you!</p>
        <button className="order-button">Order Online</button>
        <button className='products-button'>
        <Link to="/products" >View Products</Link>
          </button>
      </section>
    </div>
  );
};

export default HomePage;
