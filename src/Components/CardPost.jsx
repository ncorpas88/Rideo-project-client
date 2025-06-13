import Card from "react-bootstrap/Card";

function CardPost(props) {
  if (!props) return null

  return (
    <Card>
      <Card.Img variant="top"
      src={props.eachPost.image}
      alt={props.eachPost.image}/>
      <Card.Title>{props.eachPost.title}</Card.Title>
      <Card.Body>
        <Card.Text>{props.eachPost.distancekm}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardPost;
