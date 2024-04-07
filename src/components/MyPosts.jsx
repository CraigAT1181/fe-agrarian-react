import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import { useAuth } from "./AuthContext";
import PostCard from "./PostCard";

import CreatePostModal from "./CreatePost";

export default function MyPosts() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState();
  const [showModal, setShowModal] = useState(false);
  let [newPost, setNewPost] = useState({});
  const [postDeleted, setPostDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then(({ posts }) => {
        setIsLoading(false);
        setUserPosts(posts.filter((post) => user.userID === post.user_id));
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

    setPostDeleted(false);
  }, [newPost, postDeleted]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your posts...</p>
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
        <h5>Your posts:</h5>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleShow}>
          New Post
        </button>
        <CreatePostModal
          show={showModal}
          handleClose={handleClose}
          setNewPost={setNewPost}
        />
      </div>
      <div
        className="post-container"
        style={{ maxHeight: "420px", overflowY: "auto", padding: "1rem" }}>
        {/* Apply max height and overflow styles to create a scrollable container */}
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              setPostDeleted={setPostDeleted}
            />
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <p>You don't currently have any active posts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
