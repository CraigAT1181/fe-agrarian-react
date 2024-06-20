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

      <div className="my-blogs-display">
        {userBlogs &&
          userBlogs.length > 0 &&
          userBlogs.map((blog) => <MyBlogsSummary blog={blog} />)}
      </div>
      {userBlogs.length === 0 && (
        <div className="mt-2">
          <p>You don't currently have any active blogs.</p>
        </div>
      )}
    </div>
  );
}
