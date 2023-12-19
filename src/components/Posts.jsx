import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../App.css";

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
      <div className="post-header">
        <div className="d-flex flex-column align-items-center p-3">
          <ToggleButtonGroup
            type="radio"
            name="options">
            <ToggleButton variant="success">Available</ToggleButton>
            <ToggleButton variant="outline-success">Wanted</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <ToggleButtonGroup
            type="radio"
            name="options">
            <ToggleButton variant="success">Seeds</ToggleButton>
            <ToggleButton variant="outline-success">Produce</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="container text-center">
        <div className="post-display">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post">
              {post.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
