import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../api/api";
import { useAuth } from "./AuthContext";
import "../App.css";
import MessageButton from "./MessageButton";
import EditBlogModal from "./EditBlog";
import Comments from "./Comments";

export default function Blog() {
  const { user } = useAuth();
  let [editedBlog, setEditedBlog] = useState(false);
  const [singleBlog, setSingleBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { blog_id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getSingleBlog(blog_id)
      .then((blog) => {
        setIsLoading(false);
        
        if (blog.image_url === "" || blog.image_url === null) {
          setSingleBlog({
            ...blog,
            image_url: "https://picsum.photos/300/300",
          });
        } else {
          setSingleBlog(blog);
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
          setError({ status, message: message });
        }
      );
      setEditedBlog(false);
  }, [editedBlog]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = (blog_id) => {
    setIsLoading(true);

    deleteBlog(blog_id)
      .then(() => {
        setIsLoading(false);
        navigate("/");
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 p-4">
          <div
            className="mb-4"
            style={{ width: "100%" }}>
            <img
              className="border"
              style={{ width: "80%", padding: "1rem" }}
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
                onClick={handleShow}
                className="btn btn-outline-success mx-1 fw-bold">
                Edit
              </button>
              <EditBlogModal
                show={showModal}
                handleClose={handleClose}
                singleBlog={singleBlog}
                setEditedBlog={setEditedBlog}
              />
              <button
                onClick={() => handleDelete(blog_id)}
                className="btn btn-outline-danger mx-1 fw-bold">
                Delete
              </button>
            </div>
          )}
        </div>
        <div
          className="col-md-8 p-4"
          style={{ maxHeight: "calc(80vh - 100px)", overflowY: "auto" }}>
          <div className="blog-content mb-5 pt-3">
            {singleBlog.content &&
              singleBlog.content
                .split("\n")
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </div>
      <hr className="text-success" />
      <div className="row">
        <Comments blog_id={blog_id} author_id={singleBlog.author_id}/>
      </div>
    </div>
  );
}
