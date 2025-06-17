import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function FormUpdateProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { userId } = useParams();
  const authToken = localStorage.getItem("authToken");

  const handleSubmit =  async(e) => {
    e.preventDefault();

    const updateProfile = {
      username: username,
      email: email,
      image: image,
    };

    try {
    const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/user`,
        updateProfile,
        {
          headers: { authorization: `Bearer ${authToken}` },
        }
      );
      setUsername(response.data.username);
      setEmail(response.data.email);
      setImage(response.data.image)
      navigate("/userProfile");
    } catch (error) {
      console.log(error);
      navigate("*");
    }
  };

  return (
    <div>
      <h1>Update Profile </h1>
      <Form className="mx-5 p-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User Name: </Form.Label>
          <Form.Control
            type="text"
            name="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            name="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image: </Form.Label>
          <Form.Control
            type="text"
            name="Url"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}

export default FormUpdateProfilePage;
