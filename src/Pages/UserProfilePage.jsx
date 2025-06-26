import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import service from "../service/service.config";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function UserProfilePage() {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await service.get(`/user`);
        setUserProfile(response.data);
      } catch (error) {
        setError("Error fetching user profile");
        console.log(error);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center aling-items-center vh-100">
        <br />
        <div className="lodingpost">
          <p>Loading profile...</p>
          <img src="image/ciclismo-14.gif" alt="ciclista" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="userprofile2">
      <h1>My profile</h1>
      {userProfile && (
        <>
          <Card className="userprofile">
            <Card.Img
              src={userProfile.image}
              alt={userProfile.image}
              style={{ width: "200px", height: "auto" }}
            />
            <h3>{userProfile.username}</h3>
            <p>Email: {userProfile.email}</p>
          </Card>
          <Link to={`/updateProfile/${userProfile._id}`}>
            <Button>Update my profile</Button>
          </Link>
        </>
      )}

      <br />
      <Button className="butonlogout" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default UserProfilePage;
