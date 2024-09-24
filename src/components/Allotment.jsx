import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { fetchAllotmentPosts } from "../api/api";
import PostDisplay from "./posts/PostDisplay";

export default function Allotment() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [posts, setPosts] = useState([]);

  const { user } = useAuth();
  const { site } = useParams();

  useEffect(() => {
    if (user?.allotment_id) {
      getPosts(user.allotment_id);
    }
  }, [user]);

  const getPosts = (allotment_id) => {
    setIsLoading(true);

    fetchAllotmentPosts(allotment_id)
      .then(({ posts }) => {
        setIsLoading(false);
        setPosts(posts);
      })
      .catch(({ error }) => {
        setIsLoading(false);
        setError(error);
      });
  };

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-green-900 rounded-lg flex justify-center p-2">
        <h1 className="mb-0 text-white font-thin">{site}</h1>
      </div>
      <div>
        <PostDisplay posts={posts} />
      </div>
    </div>
  );
}
