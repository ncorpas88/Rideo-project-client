import { useContext } from "react"
import { AuthContext } from "../Context/auth.context"
import { useNavigate } from "react-router-dom"


function UserProfilePage() {


  const navigate = useNavigate()

  const {authenticateUser} = useContext(AuthContext)

  const handleLogout = async() => {

    localStorage.removeItem("authToken")

    try {
      await authenticateUser()

      navigate("/login")

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div>
      <h1>UserProfile Page</h1>

      <hr />

      <button onClick={handleLogout}>Logout</button>

    </div>
  );
}



export default UserProfilePage;
