import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar
      expand="lg"
      bg="success"
      >
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="text-white"
            as={Link}
            to="/">
            Home
          </Nav.Link>

          <Nav.Link
            className="text-white"
            as={Link}
            to="/exchange">
            Exchange
          </Nav.Link>
          <Nav.Link
            className="text-white"
            as={Link}
            to="/posts">
            Posts
          </Nav.Link>
          {user && (
            <Nav.Link
              className="text-white"
              as={Link}
              to="/messenger">
              Messenger
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
