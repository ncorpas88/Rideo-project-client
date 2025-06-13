import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

function Login() {

  const {authenticateUser} = useContext(AuthContext)
  
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

   try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {email, password})
    console.log("usuario validado por el backend", response)

    localStorage.setItem("authToken", response.data.authToken)

    await authenticateUser()

    navigate("/userProfile")


   } catch (error) {
    console.log(error)
    if(error.response.status === 400) {
      setErrorMessage(error.response.data.errorMessage)
    }else {
      navigate("/*")
    }
   }
    
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Mail:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      
    </div>
  );
}

export default Login;