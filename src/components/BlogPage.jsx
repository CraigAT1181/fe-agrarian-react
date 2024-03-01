import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api";
import BlogSummary from "./BlogSummary";
import "../App.css";

export default function BlogPage() {
  const [allBlogs, setAllBlogs] = useState([]);
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
  }, []);

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
      <div>
        {allBlogs.length > 0 ? (
          <div className="blog-page">
            {allBlogs.map((blog) => (
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
