import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { getBlogs } from "../api/api";
import BlogCard from "./BlogCard";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [blogDeleted, setBlogDeleted] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch blogs on mount and when blogDeleted changes
  useEffect(() => {
    setIsLoading(true);
    getBlogs()
      .then(({ blogs }) => {
        setIsLoading(false);
        setBlogs(blogs);
        setFilteredBlogs(blogs);
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
  }, [blogDeleted]);

  // Handle not found alert timeout
  useEffect(() => {
    let timeout;
    if (notFound) {
      timeout = setTimeout(() => setNotFound(""), 3000);
    }
    return () => clearTimeout(timeout);
  }, [notFound]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(true);
    const searchTerm = searchTerms.toLowerCase();
    if (blogs.length > 0) {
      const filtered = blogs.filter((blog) => {
        const searchTermsArray = searchTerm.split(" ");
        return (
          blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          searchTermsArray.some((word) =>
            blog.username.toLowerCase().includes(word)
          ) ||
          searchTermsArray.some((word) =>
            blog.title.toLowerCase().includes(word)
          )
        );
      });
      setFilteredBlogs(filtered);
      if (filtered.length === 0) {
        setNotFound("Couldn't find any results.");
      } else {
        setNotFound("");
      }
    }
  };

  const handleClear = () => {
    setFilteredBlogs(blogs);
    setActiveSearch(false);
    setSearchTerms("");
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="flex-col text-center">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );
  }

  // Render main content
  return (
    <div>
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
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="What are you looking for?"
                value={searchTerms}
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
      {activeSearch && (
        <div className="flex flex-col justify-center">
          <button
            className="text-blue-700 text-sm"
            onClick={handleClear}>
            clear results
          </button>
          <div className="flex justify-center">
            <p className="mb-1">{`Search results for "${searchTerms}"`}</p>
          </div>
        </div>
      )}

      <div className="mt-4">
        {notFound && <Alert variant="warning">{notFound}</Alert>}
        <div className="blog-display">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.blog_id}
                blog={blog}
                setBlogDeleted={setBlogDeleted}
              />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
