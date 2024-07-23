import { useEffect, useState } from 'react';
import './signin.scss'
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {

  const API = `${import.meta.env.VITE_BASE_URL}/users`
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setCurrentUser((prevState) => {
      return {...prevState, [e.target.name] : e.target.value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const foundUser = users.find(user => user.user_name.toLowerCase() === currentUser.username.toLowerCase())

    if(foundUser && currentUser.password === foundUser.user_password){
      navigate(`/user/${foundUser.user_id}`)
    }else {
      return (
        <div className="sign-in">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name='username' onChange={handleChange} required/>
            <input type="password" placeholder="Password" name='password' onChange={handleChange} required />
            <button type="submit">Sign In</button>
          </form> 
        </div>
      )
    }
  }

  useEffect(() => {
    fetch(API)
      .then( res => res.json())
      .then( res => setUsers(res))
      .catch(err => console.error(err))
  },[])

  return  ( 
    <div className="sign-in">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name='username' onChange={handleChange} required/>
          <input type="password" placeholder="Password" name='password' onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form> 
    </div>
  )
};

export default SignInForm;