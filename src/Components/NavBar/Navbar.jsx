import { Link, useParams } from "react-router-dom";
import "./navbar.scss";

const  NavBar = () => {

  const { id } = useParams()
  return (
    <nav>
      
      <Link to='/' className="logo">LaManRis Café</Link>
      <Link to='/login'>Login</Link>
      <Link to= '/products'> Products</Link>
      <Link to= {`/user/${id}`}> Cart</Link>
      
      
    </nav>
  );
}

export default NavBar;
