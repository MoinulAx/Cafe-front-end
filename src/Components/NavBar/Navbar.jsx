import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = ({ userId }) => {
  return (
    <nav>
      <Link to='/' className="logo">LaManRis Café</Link>
      <Link to='/login'>Login</Link>
      <Link to='/products'>Products</Link>
      {userId && <Link to={`/user/${userId}`}>Cart</Link>}
    </nav>
  );
}

export default NavBar;
