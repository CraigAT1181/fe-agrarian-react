import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../api/api";
import { useAuth } from "./AuthContext";
import MessageButtonL from "./MessageButtonL";
import EditBlogModal from "./EditBlog";
import Comments from "./Comments";

export default function Blog() {
  const { user } = useAuth();
  let [editedBlog, setEditedBlog] = useState(false);
  const [singleBlog, setSingleBlog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { blog_id } = useParams();
  const navigate = useNavigate();

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
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading blogs...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="blog-container">
      <div className="blog-image">
        <img
          src={singleBlog.image_url}
          alt="Blog cover image"
        />
      </div>

      <div className="text-center my-4">
        <h5>{singleBlog.title}</h5>
        <p>Written by: {singleBlog.username}</p>
      </div>

      <div className="my-4">
        {singleBlog.content &&
          singleBlog.content
            .split("\n")
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
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
          <button onClick={() => handleDelete(blog_id)} className="blog-buttons">Delete</button>
        </div>
      )}

      <div>
        <Comments blog_id={blog_id} />
      </div>
    </div>
  );
}
