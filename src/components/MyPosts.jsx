import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import { useAuth } from "./AuthContext";
import PostCard from "./PostCard";

export default function MyPosts() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState();

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
  }, []);

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
        <button className="btn btn-success">Create Post</button>
      </div>
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
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
