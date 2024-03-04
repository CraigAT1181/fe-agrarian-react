import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getCommentsByBlogID } from "../api/api";

function formatDate(date) {
  const day = date.getDate();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return format(date, `do 'of' MMMM, yyyy`).replace("do", `${day}${suffix}`);
}

export default function BlogSummary({ blog }) {
  const [blogComments, setBlogComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (blog) {
      getCommentsByBlogID(blog.blog_id)
        .then(({ comments }) => {
          setIsLoading(false);
          console.log(comments, "comments");
          setBlogComments(comments);
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
    }
  }, []);

  const date = new Date(blog.date_published);

  const formattedDate = formatDate(date);

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
    <div className="container blog-border">
      <div className="col text-center">
        <Link to={`/blogs/${blog.blog_id}`}>
          {blog.image_url ? (
            <div className="p-3">
              <img
                style={{ borderRadius: "20px", maxWidth: "100%" }}
                src={blog.image_url}
                alt="Blog cover image"
              />
            </div>
          ) : (
            <div className="p-3">
              <img
                style={{ borderRadius: "20px", maxWidth: "100%" }}
                src="https://picsum.photos/300/300"
                alt="Blog cover image"
              />
            </div>
          )}
        </Link>
        <div style={{ paddingBottom: "1rem" }}>
          <div style={{ height: "5rem" }}>
            <h5>{blog.title}</h5>
          </div>

          <p className="mb-0 fw-bold">Written by:</p>
          <p>{blog.username}</p>

          <p>{formattedDate}</p>

          <i className="fa-solid fa-comment text-success"></i>
           <p>{blogComments.length}</p>
        </div>
      </div>
    </div>
  );
}
