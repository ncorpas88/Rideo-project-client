import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function UserProfilePage() {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    
    const getUser = async () => {
      const storedToken = localStorage.getItem("authToken");

      
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/user`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
         // console.log("User Profile:", response.data);
          setUserProfile(response.data);
        } catch (error) {
        }
    };
    getUser();
  }, []);

  
  const handleLogout = async () => {
    localStorage.removeItem("authToken");

    try {
      await authenticateUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // poner la condicio con clausula de guardi con el loading
  return (
    <div className="userprofile2">
      <h1>My profile</h1>
      {userProfile && (
        <>
         <Card className="userprofile">
          <Card.Img src={userProfile.image} 
          alt={userProfile.image} 
          style={{width: "200px", height: "auto"}}/>
            <h3>{userProfile.username}</h3>
            <p>Email: {userProfile.email}</p>
        </Card>
         <Link to={`/updateProfile/${userProfile._id}`}>
        <Button>Update my profile</Button>
      </Link>
        </>
       
      )}
      

     

      <br />
      <Button className="butonlogout" onClick={handleLogout}>Logout</Button>
    
    </div>
  );
}

export default UserProfilePage;
