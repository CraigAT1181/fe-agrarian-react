import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import PostDisplay from "./posts/PostDisplay";
import { fetchAllotmentPosts } from "../api/api";

export default function Allotment() {
  const [isLoading, setIsLoading] = useState(true);
  const [allotmentPosts, setAllotmentPosts] = useState([]);
  const { error, user, getAllotmentPosts } = useAuth();
  const { site } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const getAllotmentPosts = async (allotment_id) => {
      try {
        const { posts } = await fetchAllotmentPosts(allotment_id);
        setAllotmentPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(error);
        setIsLoading(false);
      }
    };

    if (user) {
      getAllotmentPosts(user.user_id);
    }
  }, [user]);

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
        <PostDisplay posts={allotmentPosts} />
      </div>
    </div>
  );
}
