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
        setUserPosts(posts.filter((post) => user.user_id === post.user_id));
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
  }, [newPost, postDeleted]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <section className="container post-card p-4">
      <div className="d-flex justify-content-between mb-4">
        <h5>Your posts:</h5>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleShow}>
          Create Post
        </button>
        <CreatePostModal show={showModal} handleClose={handleClose} setNewPost={setNewPost} />
      </div>
      <div>
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
    </section>
  );
}
