import React from 'react';
import './signup.scss';

const SignUpForm = () => {
    return (
        <div className="sign-up">
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="text" placeholder="Address" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
