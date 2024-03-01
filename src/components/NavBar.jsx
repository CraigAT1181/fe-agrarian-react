import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar
      expand="lg"
      bg="success">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="text-white mx-4"
            title="Home"
            as={Link}
            to="/">
            <i className="fa-solid fa-2x fa-house"></i>
          </Nav.Link>

          <Nav.Link
            className="text-white mx-4"
            title="Exchange"
            as={Link}
            to="/exchange">
            <i className="fa-solid fa-2x fa-handshake"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Posts"
            as={Link}
            to="/posts">
            <i className="fa-solid fa-2x fa-newspaper"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Calendar"
            as={Link}
            to="#">
            <i className="fa-solid fa-2x fa-calendar-days"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Education & Activities"
            as={Link}
            to="#">
            <i className="fa-solid fa-2x fa-user-graduate"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Encyclopedia"
            as={Link}
            to="#">
            <i className="fa-brands fa-2x fa-pagelines"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Share Tips & Tricks"
            as={Link}
            to="/blogs">
            <i className="fa-solid fa-2x fa-pen"></i>
          </Nav.Link>
          <Nav.Link
            className="text-white mx-4"
            title="Shop"
            as={Link}
            to="#">
            <i className="fa-solid fa-2x fa-cart-shopping"></i>
          </Nav.Link>

          {user && (
            <Nav.Link
              className="text-white mx-4"
              title="Messages"
              as={Link}
              to="/messenger">
              <i className="fa-regular fa-2x fa-envelope"></i>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
