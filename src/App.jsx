import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Componets /NavBar/Navbar';
import HomePage from './Page/Home/Homepage';
import LoginPage from './Page/Login/LoginPage';

import './App.css'

function App() {

  return (
    <div>
        <Router>
          <NavBar />
          <main>
            <Routes>

              <Route path='/' element = {<HomePage/>}/>
              <Route path= '/login' element = {<LoginPage/>}/>
              
              




            </Routes>
          </main>
          
        </Router>

      </div>
  )
}

export default App
