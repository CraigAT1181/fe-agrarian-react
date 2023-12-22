import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../App.css";
import { getPosts } from "../api/api";
import PostCard from "./PostCard";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [posts, setPosts] = useState([]);
  let [availableVariant, setAvailableVariant] = useState("outline-success");
  let [wantedVariant, setWantedVariant] = useState("outline-danger");
  let [SeedsVariant, setSeedsVariant] = useState("outline-secondary");
  let [produceVariant, setProduceVariant] = useState("outline-primary");
  const [filteredPosts, setFilteredPosts] = useState([]);

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
  }, [filteredPosts]);

  const handleSelectedType = (value) => {
    if (value === "Seeds") {
      setSeedsVariant("secondary");
      setProduceVariant("outline-primary");
      if (availableVariant === "success") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Seed" && post.status === "Available"
          )
        );
      } else if (wantedVariant === "danger") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Seed" && post.status === "Wanted"
          )
        );
      } else {
        setFilteredPosts(posts.filter((post) => post.type === "Seed"));
      }
    }

    if (value === "Produce") {
      setSeedsVariant("outline-secondary");
      setProduceVariant("primary");
      if (availableVariant === "success") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Produce" && post.status === "Available"
          )
        );
      } else if (wantedVariant === "danger") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Produce" && post.status === "Wanted"
          )
        );
      } else {
        setFilteredPosts(posts.filter((post) => post.type === "Produce"));
      }
    }
  };

  const handleSelectedStatus = (value) => {
    if (value === "Available") {
      setAvailableVariant("success");
      setWantedVariant("outline-danger");
      if (SeedsVariant === "secondary") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Seed" && post.status === "Available"
          )
        );
      } else if (produceVariant === "primary") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Produce" && post.status === "Available"
          )
        );
      } else {
        setFilteredPosts(posts.filter((post) => post.status === "Available"));
      }
    }

    if (value === "Wanted") {
      setWantedVariant("danger");
      setAvailableVariant("outline-success");
      if (SeedsVariant === "secondary") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Seed" && post.status === "Wanted"
          )
        );
      } else if (produceVariant === "primary") {
        setFilteredPosts(
          posts.filter(
            (post) => post.type === "Produce" && post.status === "Wanted"
          )
        );
      } else {
        setFilteredPosts(posts.filter((post) => post.status === "Wanted"));
      }
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
        <div className="d-flex align-items-center p-3">
          <i
            onClick={() => {
              setFilteredPosts([]);
              setAvailableVariant("outline-success");
              setWantedVariant("outline-danger");
              setSeedsVariant("outline-secondary");
              setProduceVariant("outline-primary");
            }}
            className="fa-solid fa-arrow-rotate-left m-2"
            style={{ color: "#28a745", cursor: "pointer" }}></i>
          <ToggleButtonGroup
            type="radio"
            name="options">
            <ToggleButton
              variant={availableVariant}
              id="Available"
              onChange={() => handleSelectedStatus("Available")}>
              Available
            </ToggleButton>
            <ToggleButton
              variant={wantedVariant}
              id="Wanted"
              onChange={() => handleSelectedStatus("Wanted")}>
              Wanted
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="d-flex flex-column align-items-center p-3">
          <ToggleButtonGroup
            type="radio"
            name="options">
            <ToggleButton
              onChange={() => handleSelectedType("Seeds")}
              variant={SeedsVariant}
              id="Seeds">
              Seeds
            </ToggleButton>
            <ToggleButton
              onChange={() => handleSelectedType("Produce")}
              variant={produceVariant}
              id="Produce">
              Produce
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="container text-center">
        <div className="post-display">
          {filteredPosts.length > 0
            ? filteredPosts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                />
              ))}
        </div>
      </div>
    </>
  );
}
