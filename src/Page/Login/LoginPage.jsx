import React, { useState } from 'react';

import './login.scss'

//Componets
import SignInForm from '../../Componets /SignIn/SignIn';
import SignUpForm from '../../Componets /SignUp/SignUp';

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

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