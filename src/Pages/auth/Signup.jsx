import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, {
        email,
        username,
        password,
        image: "https://i.pravatar.cc/150?u=",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      //enviar pag de error
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/*");
      }
    }
  };

  return (
    <div className="singin">
      <h1>Signup</h1>

      <Form className="mx-5 p-2" onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
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

        <Button type="submit">signup</Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Signup;
