import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../Context/auth.context";

function DetailsPostPage(props) {
  const params = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [comments, setComents] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Detalles de un post
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/post/${
            params.postId
          }?_expand=user`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
        navigate("*");
      }
    };
    fetchDetails();
  }, []);

  //Ver comentarios del post
  useEffect(() => {
    
    fetchComments();
  }, []);

const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/comment/postCommented/${params.postId}`
        );
         //console.log("COMMENTS RESPONSE:", response.data)
        setComents(response.data || [])
      } catch (error) {
        console.log(error)
      }
    };

  // Crear comentarios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !loggedUserId) {
      alert("You must be logged in to create a post.");
      return navigate("/login");
    }

    const authToken = localStorage.getItem("authToken");

    const newComment = {
      text: text,
      image: image,
      userCreator: loggedUserId,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/comment/${params.postId}`,
        newComment,
        {
          headers: { authorization: `Bearer ${authToken}` },
        }
      );
      fetchComments();
      setText("");
      setImage("");
    } catch (error) {
      console.log(error);
      navigate("*");
    }
  };

  // Borrar Post
  const deletePost = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/post/${params.postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Borrar comentario
  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
      //actualiza comentario nuevo remplazado por el fetch de arriba
      // setComents((prevComments) =>
      //   prevComments.filter((comment) => comment._id !== commentId)
      // ) 
    } catch (error) {
      console.log(error)
    }
  }

    if (details === null) {
    return (
      <div className="d-flex justify-content-center aling-items-center vh-100">
        <Spinner animation="grow" variant="dark" />;
        <br />
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="deatailsPost">
      <div className="imagedetailpost">
        <Card>
          <Card.Img variant="top" src={details.image} alt={details.image} />
          <Card.Title>{details.title}</Card.Title>
          <Card.Body>
            <Card.Text>{details.distancekm} Km</Card.Text>
            <Card.Text>{details.location}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="buttonsPost">
        <Link to={`/formUpdatePostPage/${params.postId}`}>
          <Button variant="success">Update</Button>
        </Link>

        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
      </div>
      <hr />

      <div className="mx-5">
        <h3>Comments</h3>
        {comments.map((eachComment) => (
          <Card key={eachComment._id} className="mb-3">
            {eachComment.image && (
              <Card.Img variant="top" src={eachComment.image} alt="Comment Image"/>
            )}
            <Card.Body>
              <Card.Text>{eachComment.text}</Card.Text>
              <small>Published by: {" "}
                {eachComment.userCreator?.username || "Unknown user"}
              </small>
              {isLoggedIn && loggedUserId === eachComment.userCreator?._id && (
                <div className="mt-2">
                  <Button variant="danger" size="sm" onClick={() => deleteComment(eachComment._id)}>Delete</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}

      </div>

      <hr />
      <Form className="mx-5 p-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Comment: </Form.Label>
          <Form.Control
            type="text"
            name="Text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
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
          Submit
        </Button>
      </Form>

      <hr />

      <h1>User Creator</h1>
      <div className="carduser">
        <Card>
          <Card.Img
            variant="top"
            src={details.userCreator.image}
            alt="User Image"
            className="w-50 h-auto mx-auto d-block rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <Card.Title>{details.userCreator.username}</Card.Title>
          <Card.Body>
            <Card.Text>{details.userCreator.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>"Warning"</Modal.Title>
        </Modal.Header>
        <Modal.Body>"Are you sure you want to delete?"</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deletePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailsPostPage;
