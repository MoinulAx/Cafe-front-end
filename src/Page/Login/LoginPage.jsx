import React, { useState } from 'react';

import './login.scss'

//Componets
import SignInForm from '../../Components/SignIn/SignIn';
import SignUpForm from '../../Components/SignUp/SignUp';

const LoginPage = ({setIsSignIn , isSignIn}) => {

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="login-page">
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <p>
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <a href="#" onClick={toggleForm}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </a>
      </p>
    </div>
  );
};

export default LoginPage;