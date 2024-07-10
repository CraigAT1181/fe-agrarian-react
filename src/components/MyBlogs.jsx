import React, { useEffect, useState } from "react";
import { getBlogsByUserID } from "../api/api";
import { useAuth } from "./AuthContext";
import BlogCard from "./BlogCard";

import CreateBlogModal from "./CreateBlog";

export default function MyBlogs() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [newBlog, setNewBlog] = useState({});
  const [blogDeleted, setBlogDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBlogsByUserID(user.userID)
      .then(({ blogs }) => {
        setIsLoading(false);
        setUserBlogs(blogs);
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

    setBlogDeleted(false);
  }, [user.userID, newBlog, blogDeleted]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your blogs...</p>
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
    <div className="my-blogs-container">
      <div className="mb-4">
        <button className="dropdown" type="button" onClick={handleShow}>
          New Blog
        </button>
        <CreateBlogModal
          show={showModal}
          handleClose={handleClose}
          setNewBlog={setNewBlog}
        />
      </div>
      <div>
        {userBlogs.length > 0 ? (
          <div className="my-blogs-display">
            {userBlogs.map((blog) => (
              <BlogCard
                key={blog.blog_id}
                blog={blog}
                setBlogDeleted={setBlogDeleted}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center my-4">
            <span>You don't currently have any active blogs.</span>
          </div>
        )}
      </div>
    </div>
  );
}
