import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="/createPost"><button>Post+</button></Link> 
     
    </div>
  );
}

export default Footer;
