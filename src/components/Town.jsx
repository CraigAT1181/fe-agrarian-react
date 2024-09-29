import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { fetchTownPosts } from "../api/api";
import PostDisplay from "./posts/PostDisplay";

export default function Town() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, getTownPosts, posts } = useAuth();
  const { town } = useParams();

  useEffect(() => {
    if (user?.town_id) {
      getTownPosts(user.town_id);
      setIsLoading(false);
    } else {
      getTownPosts("21ffcbff-aecd-4209-93fd-57a55c9d3da7");
      setIsLoading(false);
    }
  }, [user]);

  const getPosts = (town_id) => {
    setIsLoading(true);

    fetchTownPosts(town_id)
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
        <h1 className="mb-0 text-white font-thin">{town}</h1>
      </div>
      <div>
        <PostDisplay posts={posts} />
      </div>
    </div>
  );
}
