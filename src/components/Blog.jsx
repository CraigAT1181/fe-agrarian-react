import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../api/api";
import { useAuth } from "./AuthContext";
import EditBlogModal from "./EditBlog";
import Comments from "./Comments";

// Blog component: displays details of a single blog post
export default function Blog() {
  const { user } = useAuth();
  const [singleBlog, setSingleBlog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedBlog, setEditedBlog] = useState(false);
  
  // Routing and blog ID
  const { blog_id } = useParams();
  const navigate = useNavigate();

  // Fetch single blog data
  useEffect(() => {
    setIsLoading(true);
    const fetchBlog = async () => {
      try {
        const blog = await getSingleBlog(blog_id);
        setSingleBlog({
          ...blog,
          image_url: blog.image_url || "https://picsum.photos/300/300",
        });
        setIsLoading(false);
      } catch (error) {
        const { response: { status, data: { message } } } = error;
        setIsLoading(false);
        setError({ status, message });
      }
    };

    fetchBlog();
    setEditedBlog(false);
  }, [blog_id, editedBlog]);

  // Handle modal visibility
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle blog deletion
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteBlog(id);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      const { response: { status, data: { message } } } = error;
      setIsLoading(false);
      setError({ status, message });
    }
  };

  // Loading and error handling
  if (isLoading) {
    return (
      <div className="loading-container">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fa-solid fa-exclamation"></i>
        <p>Oops, there's been an error: {error.status} {error.message}</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-image">
        <img src={singleBlog.image_url} alt="Blog cover" />
      </div>

      <div className="text-center my-4">
        <h5>{singleBlog.title}</h5>
        <p>Written by: {singleBlog.username}</p>
      </div>

      <div className="blog-content my-4">
        {singleBlog.content &&
          singleBlog.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>

      {user && user.userID === singleBlog.author_id && (
        <div className="flex justify-center my-4">
          <button onClick={handleShow} className="blog-buttons">Edit</button>
          <EditBlogModal
            show={showModal}
            handleClose={handleClose}
            singleBlog={singleBlog}
            setEditedBlog={setEditedBlog}
          />
          <button
            onClick={() => handleDelete(blog_id)}
            className="blog-buttons"
          >
            Delete
          </button>
        </div>
      )}

      <div className="comments-section">
        <Comments blog_id={blog_id} />
      </div>
    </div>
  );
}
