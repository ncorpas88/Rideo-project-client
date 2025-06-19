import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <div className="login">

      <h1>Login</h1>

      <Form className="mx-5 p-2" onSubmit={handleLogin}>
        <Form.Group className="mb-3">
        <Form.Label>Mail: </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </Form.Group>

        <br />

        <Button type="submit">login</Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Form>
      
    </div>
  );
}

export default Login;