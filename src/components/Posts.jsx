import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { getPosts } from "../api/api";
import PostCard from "./PostCard";
import FilterModal from "./FilterModal";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [searchParams, postDeleted]);

  const fetchPosts = () => {
    setIsLoading(true);
    getPosts(searchParams)
      .then(({ posts }) => {
        setIsLoading(false);
        setPosts(posts);
        setFilteredPosts(posts); // Initialize filtered posts with all posts
        if (searchParams && posts.length === 0) {
          setNotFound("Sorry, no posts match your search.");
        } else {
          setNotFound(null);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const applyFilters = (status, type) => {
    let filtered = posts;

    if (status && type) {
      filtered = filtered.filter(
        (post) => post.status === status && post.type === type
      );
    } else if (status) {
      filtered = filtered.filter((post) => post.status === status);
    } else if (type) {
      filtered = filtered.filter((post) => post.type === type);
    }

    setFilteredPosts(filtered);
  };

  const handleClearFilters = () => {
    setFilteredPosts(posts); // Reset filtered posts to all posts
  };

  const handleShow = () => setShowFilter(true);
  const handleClose = () => setShowFilter(false);

  if (error) {
    return (
      <div className="flex justify-center mt-4">
        <div className="flex-col text-center">
          <i className="fa-solid fa-exclamation"></i>
          <p>Oops, there's been an error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="flex justify-center">
        <button
          className="dropdown"
          type="button"
          onClick={handleShow}>
          Filter
        </button>
        <FilterModal
          show={showFilter}
          handleClose={handleClose}
          applyFilters={applyFilters}
        />
      </div>

      <div className="flex justify-center">
        <div className="search-bar-container">
          <form onSubmit={handleSearch}>
            <div className="w-full relative">
              <label
                htmlFor="item-search"
                className="form-label"
                aria-label="Search"></label>
              <input
                id="item-search"
                className="search-bar-input"
                onChange={(e) => setSearchParams(`item=${e.target.value}`)}
                type="text"
                placeholder="What are you looking for?"
              />
              <button
                type="submit"
                className="search-button">
                <i
                  className="fa-solid fa-magnifying-glass"
                  aria-label="search button"
                  title="search button"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="">
        <div className="mt-4">{notFound && <span>{notFound}</span>}</div>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="flex-col text-center">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <div className="post-display">
            {filteredPosts.length > 0 &&
              filteredPosts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  setPostDeleted={setPostDeleted}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
