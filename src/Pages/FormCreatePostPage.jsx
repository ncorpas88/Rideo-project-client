import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../Context/auth.context";

function FormCreatePostPage() {
  const navigate = useNavigate();
  const {isLoggedIn, loggedUserId} = useContext(AuthContext);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distancekm, setDistancekm] = useState("");
  const [location, setLocation] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !loggedUserId){
      alert("You must be logged in to create a post.");
      return navigate("/login");
    }

    const authToken = localStorage.getItem("authToken");

    const newPost = {
      image: image,
      title: title,
      description: description,
      distancekm: distancekm,
      location: location,
      userCreator: loggedUserId,
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post`, newPost, {
        headers: {authorization: `Bearer ${authToken}`}
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("*");
    }
  };

   const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
   
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        uploadData,  
        { headers: { authorization: `Bearer ${authToken}` } }

      );
     
      setImage(response.data.image);
      setIsUploading(false); 
        } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <Form className="mx-5 p-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image: </Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </Form.Group>

        {isUploading ? <h3>... uploading image</h3> : null}
        {image ? (
          <div>
            <img src={image} alt="img" width={200} />
          </div>
        ) : null}
      

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

          <Button disabled={isUploading} variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
}

export default FormCreatePostPage;
