import { useEffect, useState } from 'react';
import './signin.scss';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ setUserId }) => { // Receive setUserId from props
  const API = `${import.meta.env.VITE_BASE_URL}/users`;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(user => user.user_name.toLowerCase() === currentUser.username.toLowerCase());

    if (foundUser && currentUser.password === foundUser.user_password) {
      setUserId(foundUser.user_id); // Set userId on successful login
      navigate(`/user/${foundUser.user_id}`);
    }
  };

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(res => setUsers(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name='username' onChange={handleChange} required />
        <input type="password" placeholder="Password" name='password' onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
