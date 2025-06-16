import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="nav">
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoggedIn === false ? (
        <>
          <Link to="/signin">
            <button>Signin</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/userProfile">
            <button>Profile</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
