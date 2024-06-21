import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getCommentsByBlogID } from "../api/api";
import { deleteBlog } from "../api/api";

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

export default function BlogCard({ blog, setBlogDeleted }) {
  const { user } = useAuth();
  const [blogComments, setBlogComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (blog) {
      getCommentsByBlogID(blog.blog_id)
        .then(({ comments }) => {
          setIsLoading(false);
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
  }, [blog]);

  const handleDelete = () => {
    deleteBlog(blog.blog_id).then(() => {
      setBlogDeleted(true);
    });
  };

  const shortenedTitle = (title) => {
    const maxLength = 50;
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const shortenedContent = (content) => {
    const maxLength = 50;
    return content.length > maxLength
      ? `${content.slice(0, maxLength)}...`
      : content;
  };

  const date = new Date(blog.date_published);
  const formattedDate = formatDate(date);

  if (isLoading)
    return (
      <div className="error-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading blogs...</p>
      </div>
    );
  if (error)
    return (
      <div className="error-loading">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="blog-card">
      <div className="relative">
        <img
          src={
            blog.image_url ? blog.image_url : "https://picsum.photos/300/300"
          }
          alt="Blog cover image"
          className="blog-card-image"
        />
        {user && user.userID === blog.blog_id && (
          <div
            className="absolute top-2 right-2 bg-green-950 p-2 rounded-lg border shadow-sm shadow-green-950"
            onClick={handleDelete}>
            <i className="fa-solid xl fa-trash text-white"></i>
          </div>
        )}
      </div>

      <Link
        to={`/blogs/${blog.blog_id}`}
        className="no-underline">
        <div className="blog-card-title">
          <h5 className="text-white mb-0">{shortenedTitle(blog.title)}</h5>
        </div>
      </Link>
      <div className="p-2">
        <div>
          <p>{shortenedContent(blog.content)}</p>
        </div>

        <div>
          <p className="font-semibold">Written by: {blog.username}</p>
        </div>

        <div>
          <p>{formattedDate}</p>
        </div>

        <div title="Comments">
          <i className="fa-solid fa-comment text-green-950"></i>
          <p className="mb-0">{blogComments.length}</p>
        </div>
      </div>
    </div>
  );
}
