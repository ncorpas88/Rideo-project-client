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
 
  const authToken = localStorage.getItem("authToken");

 
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
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
      //console.log(response.data.image)
      navigate("/userProfile");
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
    <div className="formprofile">
      
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
        <Button disabled={isUploading} variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}

export default FormUpdateProfilePage;
