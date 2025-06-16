import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/auth.context"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function UserProfilePage() {


  const navigate = useNavigate()

  const {authenticateUser} = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const { loggedUserId } = useContext(AuthContext)


  useEffect(() => {
  if (!loggedUserId) return
    const getUser = async () => {
      const storedToken = localStorage.getItem("authToken")

      if (storedToken) {
        try {
         const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${loggedUserId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
          setUserProfile(response.data)
          setLoading(false)
        } catch (error) {
          const errorDescription = error.response.data.message  
          setErrorMessage(errorDescription)
        }
      }else {
        setErrorMessage("User not logged in")
      }
  }
  getUser()
}, [loggedUserId])

if (!loggedUserId) return <div>Loading user...</div>
if (errorMessage) return <div>{errorMessage}</div>
if (loading) return <div>Loading...</div>

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
      {userProfile && (
        <>
        <img src={userProfile.image} alt={userProfile.image} />
        <h1>{userProfile.username}</h1>
        <p>Email: {userProfile.email}</p>  
        </>        
      )}
      <hr />



      <hr />
      <button onClick={handleLogout}>Logout</button>
      <hr />
    </div>
  );
}



export default UserProfilePage;
