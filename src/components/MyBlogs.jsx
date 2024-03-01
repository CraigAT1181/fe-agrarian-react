import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api";
import { useAuth } from "./AuthContext";
import BlogSummary from "./BlogSummary";

import CreateBlogModal from "./CreateBlog";

export default function MyBlogs() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBlogs, setUserBlogs] = useState();
  const [showModal, setShowModal] = useState(false);
  let [newBlog, setNewBlog] = useState({});
  const [BlogDeleted, setBlogDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBlogs()
      .then(({ blogs }) => {
        console.log(blogs, user.userID);
        setIsLoading(false);
        setUserBlogs(blogs.filter((blog) => user.username === blog.username));
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
  }, [newBlog, BlogDeleted]);

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
    <div className="container box-border p-4 mt-3">
      <div className="d-flex justify-content-between">
        <h5>Your blogs:</h5>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleShow}>
          Write a blog
        </button>
        <CreateBlogModal
          show={showModal}
          handleClose={handleClose}
          setNewBlog={setNewBlog}
        />
      </div>
      <div>
        {console.log(userBlogs)}
        {userBlogs && userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div style={{maxWidth: "25%"}}>
              <BlogSummary
                key={blog.blog_id}
                blog={blog}
                setBlogDeleted={setBlogDeleted}
              />
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <p>You've not written any blogs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
