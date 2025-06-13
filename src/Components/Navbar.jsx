import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <Link to="/"><button>Home</button></Link>
      <Link to="/signin"><button>Signin</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default Navbar;
