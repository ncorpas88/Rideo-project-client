import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CardPost(props) {
  if (!props) return null;

  return (
    <Card className="cards">
      <Link to={`/details/${props.eachPost._id}`}>
        <Card.Img
          variant="top"
          src={props.eachPost.image}
          alt={props.eachPost.image}
        />
      </Link>
      <Card.Title>{props.eachPost.title}</Card.Title>
      <Card.Body>
        <Card.Text>{props.eachPost.distancekm} Km</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardPost;
