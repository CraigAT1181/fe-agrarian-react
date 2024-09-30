import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeNav({ setSelectedComponent }) {
  return (
    <Navbar expand="md">
      <Nav className="w-100">
        <Nav.Item className="w-25 text-center fw-bold" style={{boxShadow: "0 0 10px 0 #ccc", margin: "0.5rem"}}>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => setSelectedComponent("MyProduce")}>
            My Produce
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-25 text-center fw-bold" style={{boxShadow: "0 0 10px 0 #ccc", margin: "0.5rem"}}>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => setSelectedComponent("MyPosts")}>
            My Posts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-25 text-center fw-bold" style={{boxShadow: "0 0 10px 0 #ccc", margin: "0.5rem"}}>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => setSelectedComponent("MyBlogs")}>
            My Blogs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="w-25 text-center fw-bold" style={{boxShadow: "0 0 10px 0 #ccc", margin: "0.5rem"}}>
          <Nav.Link
            as={Link}
            to="#"
            onClick={() => setSelectedComponent("MyActivities")}>
            My Activities
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
