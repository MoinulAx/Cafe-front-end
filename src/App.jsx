import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//COMPONENTS
import NavBar from './Components/NavBar/Navbar';
import HomePage from './Page/Home/Homepage';
import LoginPage from './Page/Login/LoginPage';
import ProductsPage from './Page/Products/ProductsPage';
import User from './Page/User/User';


import './App.css'

function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <main>
          
          <Routes>

            <Route path='/' element={ <HomePage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/products' element={ <ProductsPage /> } />
            <Route path='/user/:id' element={ <User/> }/>

          </Routes>

        </main>
      </Router>
    </div>
  )
}

export default App
