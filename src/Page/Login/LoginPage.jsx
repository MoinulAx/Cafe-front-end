import React, { useState } from 'react';

import './login.scss'

//Componets
import SignInForm from '../../Components/SignIn/SignIn';
import SignUpForm from '../../Components/SignUp/SignUp';

const LoginPage = ({setUserId}) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="login-page">
      {isSignIn ? <SignInForm setUserId = {setUserId}/> : <SignUpForm setIsSignIn={setIsSignIn}/>}
      <div className='toggle-container'>
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <p className='link' onClick={toggleForm}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;