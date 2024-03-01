import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { getBlogs } from "../api/api";
import BlogSummary from "./BlogSummary";
import "../App.css";

export default function BlogPage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState([]);
  let [searchTerms, setSearchTerms] = useState("");
  let [notFound, setNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getBlogs()
      .then(({ blogs }) => {
        setIsLoading(false);
        console.log(blogs);
        setAllBlogs(blogs);
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
  }, [searchBlogs]);

  useEffect(() => {
    let timeout;

    if (notFound) {
      timeout = setTimeout(() => {
        setNotFound(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [notFound]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchTerm = searchTerms.toLocaleLowerCase();

    if (allBlogs) {
      const filteredBlogs = allBlogs.filter((blog) => {
        // Check if any tag in the blog matches the search term
        return blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      });

      setSearchBlogs(filteredBlogs);
      if (filteredBlogs.length === 0) {
        setNotFound("Couldn't find any blog tags based on your search.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading blogs...</p>
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
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="d-flex align-items-center p-3">
          <i
            onClick={() => {
              setSearchBlogs([]);
              setSearchTerms("");
              setNotFound("");
            }}
            className="fa-solid fa-arrow-rotate-left m-2"
            style={{ color: "#28a745", cursor: "pointer" }}></i>
        </div>
        <form
          className="my-3 w-25"
          onSubmit={(e) => handleSearch(e)}>
          <div className="input-group">
            <label
              htmlFor="topic-search"
              className="form-label"
              aria-label="Search"
              aria-describedby="button-addon2"></label>
            <input
              id="topic-search"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
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
      <div
        className="d-flex justify-content-center"
        style={{ height: "4.5rem" }}>
        {notFound && (
          <Alert
            className="d-flex justify-content-center w-50"
            variant="danger">
            {notFound}
          </Alert>
        )}
      </div>
      <div>
        {allBlogs.length > 0 ? (
          <div className="blog-page">
            {searchBlogs && searchBlogs.length > 0
              ? searchBlogs.map((blog) => (
                  <BlogSummary
                    key={blog.blog_id}
                    blog={blog}
                  />
                ))
              : allBlogs.map((blog) => (
                  <BlogSummary
                    key={blog.blog_id}
                    blog={blog}
                  />
                ))}
          </div>
        ) : (
          <Alert variant="success">
            <div>
              No one has posted any blogs yet... is there anything you'd like to
              share?
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
}
