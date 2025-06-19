import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="/createPost"><img src="image/camara.png" alt="camara" width={110}/></Link> 
     
    </div>
  );
}

export default Footer;
