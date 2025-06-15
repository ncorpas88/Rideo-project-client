import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FormCreatePostPage() {
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distancekm, setDistancekm] = useState("");
  const [location, setLocation] = useState("");
  const [userCrator, setUserCreator] = useState("");

  const handleSumit = async(e) => {

    const newPost = {
      image: image,
      title: title,
      description: description,
      distancekm: distancekm,
      location: location,
      userCrator: userCrator
    }

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post`, newPost)
      navigate("/")
    } catch (error) {
      console.log(error)
      navigate("*")
    }

  }


  return (
    <div>
      <h1>Add Post</h1>
      <Form className="mx-5 p-2" onSubmit={handleSumit}>
        <Form.Group className="mb-3">
          <Form.Label>Image: </Form.Label>
          <Form.Control
          type="text"
          name="Url"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}/>
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
        <Button variant="success" type="submit">Add Post</Button>
      </Form>
     

    </div>
  );
}

export default FormCreatePostPage;
