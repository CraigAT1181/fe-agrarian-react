import React, { useEffect, useState } from "react";
import { getBlogsByUserID } from "../api/api";
import { useAuth } from "./AuthContext";
import MyBlogsSummary from "./MyBlogsSummary";

import CreateBlogModal from "./CreateBlog";

export default function MyBlogs() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBlogs, setUserBlogs] = useState();
  const [showModal, setShowModal] = useState(false);
  let [newBlog, setNewBlog] = useState({});

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
  }, [newBlog]);

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
    <div className="container h-100">
      <div className="d-flex justify-content-between mb-2">
        <h5>Your blogs:</h5>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleShow}>
          New blog
        </button>
        <CreateBlogModal
          show={showModal}
          handleClose={handleClose}
          setNewBlog={setNewBlog}
        />
      </div>



      <div
        className="d-flex"
        style={{ maxWidth: "100%", overflowX: "auto", padding: "2px" }}>
        {userBlogs && userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div
              className="p-1"
              style={{ width: "330px", marginRight: "1rem", flex: "0 0 auto" }}
              key={blog.blog_id}>
              <MyBlogsSummary blog={blog} />
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
