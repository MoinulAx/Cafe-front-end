import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import NavBar from './Components/NavBar/Navbar';
import HomePage from './Page/Home/Homepage';
import LoginPage from './Page/Login/LoginPage';
import ProductsPage from './Page/Products/ProductsPage';
import User from './Page/User/User';
import CartPage from './Page/Cart/CartPage';

import './App.css';

function App() {
  const [userId, setUserId] = useState(null); // State to hold userId

  return (
    <div>
      <Router>
        <NavBar setUserId = {setUserId}userId={userId} /> {/* Pass userId to NavBar */}
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage setUserId={setUserId} />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/user/:id' element={<CartPage userId={userId} />} />
          </Routes>
        </main>
      </Router>
      <video loop muted autoPlay>
        <source src="./src/assets/vecteezy_coffee-beans-coffee-flying-brown_19080887.mp4" type='video/mp4' />
      </video>
    </div>
  );
}

export default App;
