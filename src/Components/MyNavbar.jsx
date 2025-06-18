import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavbarBrand } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MyNavbar() {
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  const [expanded, setExpanded] = useState(false);
  
  const handleSearch = (e) => {
    const currentDistance = searchParams.get("distancekm");
 
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (currentDistance) params.set("distancekm", currentDistance)
    setExpanded(false)  
    navigate(`/?search=${search}`);
  };

  return (
    <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} expand="lg" className="nav">
        <NavbarBrand as={Link} to="/" onClick={() => setExpanded(false)}>
        <img src="image/rideo.png" alt="logo" width={200}/>
      </NavbarBrand>
      <NavbarBrand>
        <img src="image/ciclista.gif" alt="ciclista" width={100} />
      </NavbarBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggleBtn" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto gap-0">
        <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
          <Button>Home</Button>
        </Nav.Link>
        {isLoggedIn === false ? (
          <>
            <Nav.Link as={Link} to="/signin" onClick={() => setExpanded(false)}>
              <Button>Signin</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
              <Button>Login</Button>
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/userProfile" onClick={() => setExpanded(false)}>
              <Button>Profile</Button>
            </Nav.Link>
          </>
        )}
        </Nav>
        <Form className="d-flex align-items-center ms-auto">
          <Row className="align-items-center g-2">
            <Col xs={7}>
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleSearch} variant="success" type="button">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
