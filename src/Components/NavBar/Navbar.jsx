import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = ({ userId,setUserId }) => {
  const handleLogout = () => {
    setUserId(null)
  };

  return (
    <nav>
      <Link to='/' className="logo">LaManRis Café</Link>
      {userId ? (
        <>
          <Link to='/login' onClick={handleLogout}>Logout</Link>
          <Link to={`user/${userId}`}>{userId == 1 ? "Orders" : "Cart"}</Link>
        </>
      ) : (
        <Link to='/login'>Login</Link>
      )}
      <Link to='/products'>Products</Link>
    </nav>
  );
};

export default NavBar;
