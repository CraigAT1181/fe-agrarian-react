import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByBlogID, getSingleBlog } from "../api/api";
import { useAuth } from "./AuthContext";
import "../App.css";
import MessageButton from "./MessageButton";

export default function Blog() {
  const { user } = useAuth();
  const [blogComments, setBlogComments] = useState([]);
  const [singleBlog, setSingleBlog] = useState({
    blog_id: 0,
    title: "",
    username: "",
    content: "",
    tags: [],
    date_published: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { blog_id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getSingleBlog(blog_id)
      .then((blog) => {
        setIsLoading(false);
        console.log(blog);
        setSingleBlog(blog);
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

    if (blog_id) {
      getCommentsByBlogID(blog_id)
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="mb-4">
            <img
              src={singleBlog.image_url}
              alt="Blog cover image"
            />
          </div>
          <div>
            <h5>{singleBlog.title}</h5>
            <p>Written by: {singleBlog.username}</p>
          </div>
          {user && user.userID !== singleBlog.author_id && (
            <div>
              <MessageButton partner={singleBlog.author_id} />
            </div>
          )}
          {user && user.userID === singleBlog.author_id && (
            <div className="d-flex flex-md-row">
              <button
                onClick={() => navigate("#")}
                className="btn btn-success text-white mx-1 fw-bold">
                Edit
              </button>
              <button
                onClick={() => navigate("#")}
                className="btn btn-outline-danger mx-1 fw-bold">
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div
            className="blog-content mt-5 mb-5"
            style={{ overflowY: "auto" }}>
            {singleBlog.content}
          </div>
        </div>
      </div>
      <hr className="text-success" />
      <div className="row">
        {blogComments &&
          blogComments.map((comment, index) => (
            <div key={index}>{comment.comment}</div>
          ))}
      </div>
    </div>
  );
}
