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
      <div className="error-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your posts...</p>
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
    <div className="my-posts-container">
      <div className="mb-4">
        <button type="button" className="dropdown" onClick={handleShow}>
          New Post
        </button>
        <CreatePostModal
          show={showModal}
          handleClose={handleClose}
          setNewPost={setNewPost}
        />
      </div>
      <div>
        {userPosts.length > 0 ? (
          <div className="my-posts-display">
            {userPosts.map((post) => (
              <PostCard
                key={post.post_id}
                post={post}
                setPostDeleted={setPostDeleted}
              />
            ))}
          </div>
        ) : (
          <div className="my-4">
            <p>You don't currently have any active posts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
