import service from "../service/service.config";
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

  const [isUploading, setIsUploading] = useState(false);

  // Detalles de un post
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await service.get(
          `/post/${params.postId}?_expand=user`
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
      const response = await service.get(
        `/comment/postCommented/${params.postId}`
      );
      //console.log("COMMENTS RESPONSE:", response.data)
      setComents(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Crear comentarios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !loggedUserId) {
      alert("You must be logged in to create a post.");
      return navigate("/login");
    }

    const newComment = {
      text: text,
      image: image,
      userCreator: loggedUserId,
    };

    try {
      await service.post(`/comment/${params.postId}`, newComment);
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
      await service.delete(`/post/${params.postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Borrar comentario
  const deleteComment = async (commentId) => {
    try {
      await service.delete(`/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.log(error);
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
      const response = await service.post(`/upload`, uploadData);

      setImage(response.data.image);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

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
            <Card.Text>{details.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="buttonsPost">
        {isLoggedIn && loggedUserId === details.userCreator?._id && (
          <>
            <Link to={`/formUpdatePostPage/${params.postId}`}>
              <Button variant="success">Update</Button>
            </Link>

            <Button variant="danger" onClick={handleShow}>
              Delete
            </Button>
          </>
        )}
      </div>
      <hr />
      <h3>Comments</h3>
      <div className="mx-5">
        {comments.map((eachComment) => (
          <Card key={eachComment._id} className="mb-3">
            {eachComment.image && (
              <Card.Img
                variant="top"
                src={eachComment.image}
                alt="Comment Image"
              />
            )}
            <Card.Body>
              <Card.Text>{eachComment.text}</Card.Text>
              <small>
                Published by:{" "}
                {eachComment.userCreator?.username || "Unknown user"}
              </small>
              {isLoggedIn && loggedUserId === eachComment.userCreator?._id && (
                <div className="mt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteComment(eachComment._id)}
                  >
                    Delete
                  </Button>
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
          <Link>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Link>
        </Form.Group>

        {isUploading ? <h3>... uploading image</h3> : null}
        {image ? (
          <div>
            <img src={image} alt="img" width={200} />
          </div>
        ) : null}

        <Button
          className="butoncomment"
          disabled={isUploading}
          variant="primary"
          type="submit"
        >
          Comment
        </Button>
      </Form>

      <hr />

      <h1>User Creator</h1>
      <div className="carduser">
        <Card className="tarjetauser">
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
