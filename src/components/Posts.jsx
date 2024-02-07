import React, { useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../App.css";
import { getPosts } from "../api/api";
import PostCard from "./PostCard";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [posts, setPosts] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [searchParams, setSearchParams] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);
  let [availableVariant, setAvailableVariant] = useState("outline-success");
  let [wantedVariant, setWantedVariant] = useState("outline-danger");
  let [seedsVariant, setSeedsVariant] = useState("outline-secondary");
  let [produceVariant, setProduceVariant] = useState("outline-primary");
  const [postDeleted, setPostDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPosts(searchParams)
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
    setNotFound(null);
    setPostDeleted(false);
  }, [filteredPosts, postDeleted]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getPosts(searchParams)
      .then(({ posts, message }) => {
        setIsLoading(false);

        if (Array.isArray(posts)) {
          setFilteredPosts(posts);
          setSearchParams("");
        } else if (message) {
          setNotFound(message);
        }
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message });
        }
      );
  };

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
      if (seedsVariant === "secondary") {
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
      if (seedsVariant === "secondary") {
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading posts...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="d-flex p-4 box-border justify-content-center">
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
            className="mx-3"
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

          <ToggleButtonGroup
            className="mx-3"
            type="radio"
            name="options">
            <ToggleButton
              onChange={() => handleSelectedType("Seeds")}
              variant={seedsVariant}
              id="Seeds">
              Seed
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
      <div className="d-flex justify-content-center">
        <form
          className="my-3 w-25"
          onSubmit={(e) => handleSearch(e)}>
          <div className="input-group">
            <label
              htmlFor="item-search"
              className="form-label"
              aria-label="Search"
              aria-describedby="button-addon2"></label>
            <input
              id="item-search"
              className="form-control"
              onChange={({ target }) => setSearchParams(`item=${target.value}`)}
              type="text"
              placeholder="What are you looking for?"
            />
            <button
              className="btn btn-success"
              id="button-addon2">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="container text-center">
        <div>
          {notFound ? <h5 style={{ color: "red" }}>{notFound}</h5> : null}
        </div>
        <div className="post-display">
          {filteredPosts.length > 0
            ? filteredPosts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  setPostDeleted={setPostDeleted}
                />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  setPostDeleted={setPostDeleted}
                />
              ))}
        </div>
      </div>
    </>
  );
}
