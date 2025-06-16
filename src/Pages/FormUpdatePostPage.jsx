import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FormUpdatePostPage() {

  const  navigate = useNavigate(); 
  const {postId} = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distancekm, setDistancekm] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatePost = {
      image: image,
      title: title,
      description: description,
      distancekm: distancekm,
      location: location
    }

    const authToken = localStorage.getItem("authToken");

    try {
      axios.put(`${import.meta.env.VITE_SERVER_URL}/api/post/${postId}`, updatePost, {
        headers: {authorization: `Bearer ${authToken}`}
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("*")
    }

  }
  
  return (
    <div>
      <h1>Update Post</h1>
      <Form className="mx-5 p-2" onSubmit={handleSubmit}>
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

         <Form.Group className="mb-3">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            name="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Description: </Form.Label>
          <Form.Control
            type="text"
            name="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

         <Form.Group className="mb-3">
          <Form.Label>Distance: </Form.Label>
          <Form.Control
            type="number"
            name="Distance"
            value={distancekm}
            required
            onChange={(e) => setDistancekm(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location: </Form.Label>
          <Form.Control
            type="text"
            name="Location"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

         <Button variant="success" type="submit">Update</Button>
      </Form> 
    </div>
  );
}

export default FormUpdatePostPage;
