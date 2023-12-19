import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const posts = [
  { id: 1, content: "Post 1" },
  { id: 2, content: "Post 2" },
  { id: 3, content: "Post 3" },
  { id: 4, content: "Post 4" },
  { id: 5, content: "Post 5" },
  { id: 6, content: "Post 6" },
  { id: 7, content: "Post 7" },
  // Add more posts as needed
];

export default function Posts() {
  const [display, setDisplay] = useState("");
  const handlePostSelection = (selectedItem) => {
    if (selectedItem === "seeds") {
      setDisplay("seeds");
    } else if (selectedItem === "produce") {
      setDisplay("produce");
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <p>Showing all posts</p>
        <p>Click below to filter between seeds or produce</p>
        <Dropdown
          onSelect={(selectedItem) => handlePostSelection(selectedItem)}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="seeds">Seeds</Dropdown.Item>
            <Dropdown.Item eventKey="produce">Produce</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {posts.map((post) => (
            <div key={post.id} className="col-12 col-sm-6 col-md-3">
              {post.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
