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
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      <Router>
        <NavBar />
        <main>
          <Routes>

<<<<<<< HEAD
              <Route path='/' element = {<HomePage isSignIn = {isSignIn} setIsSignIn = {setIsSignIn}/>}/>
              <Route path= '/login' element = {<LoginPage/>}/>
              
              
=======
            <Route path='/' element={ <HomePage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/products' element={ <ProductsPage /> } />
            <Route path='/user/:id' element={ <User/> }/>
>>>>>>> test

          </Routes>
        </main>

      </Router>

    </div>
  )
}

export default App
