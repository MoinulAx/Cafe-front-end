import { Link } from "react-router-dom";
import "./navbar.scss";

const  NavBar = () => {
  return (
    <nav>
      <Link to='/' className="logo">LaManRis Café</Link>
      <Link to='/login'>Login</Link>
      
    </nav>
  );
}

export default NavBar;
