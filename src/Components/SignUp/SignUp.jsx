import React, { useEffect, useState } from 'react';
import './signup.scss';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({setIsSignIn}) => {

    const navigate = useNavigate()

    const API = `${import.meta.env.VITE_BASE_URL}/users`
    const [newUser, setNewUser] = useState({
        user_full_name: "",
        user_name: "",
        user_password: "",
        user_address: ""
    })

    const handleChange = (e) => {
        setNewUser((prevState) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(newUser)

        fetch(API, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then( res =>{ 
            setIsSignIn(true)
        })
        .catch( err => console.error(err))
    }

    return (
        <div className="sign-up">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="name" placeholder="Full Name" onChange={handleChange} name='user_full_name'/>
                <input type="text" placeholder="Username" onChange={handleChange} name='user_name'/>
                <input type="password" placeholder="Password" onChange={handleChange} name='user_password'/>
                <input type="text" placeholder="Address" onChange={handleChange} name='user_address'/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
