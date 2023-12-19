import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../App.css";
import { getPosts } from "../api/api";
import PostCard from "./PostCard";

export default function Posts() {
  const [display, setDisplay] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getPosts()
      .then(({ posts }) => {
        setIsLoading(false);
        setPosts(posts);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  }, []);

  const handlePostSelection = (selectedItem) => {
    if (selectedItem === "seeds") {
      setDisplay("seeds");
    } else if (selectedItem === "produce") {
      setDisplay("produce");
    }
  };

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

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
              key={post.post_id}
              className="post">
              <PostCard post={post}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
