import React, { useEffect, useState } from "react";
import { fetchAllotmentPosts } from "../api/api";

import { usePosts } from "./contexts/PostContext";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";

import PostDisplay from "./posts/PostDisplay";
import PostSubmit from "./posts/PostSubmit";

export default function Allotment() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { postAddition, postDeletion } = usePosts();
  const { user } = useAuth();

  const { site } = useParams();
  const [allotmentPosts, setAllotmentPosts] = useState({});

  const allotmentPostsArray = Object.values(allotmentPosts).filter(
    (post) => post.scope === "allotment" && post.is_reply !== true
  );

  const fetchPosts = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const { posts: allotmentPostsData } = await fetchAllotmentPosts(
          user.allotment_id
        );

        if (!allotmentPostsData) {
          console.error("Unable to fetch Allotment posts from database.");
        }

        const normalisedAllotmentPosts = allotmentPostsData.reduce(
          (acc, post) => {
            acc[post.post_id] = post;
            return acc;
          },
          {}
        );

        setAllotmentPosts(normalisedAllotmentPosts);
      } catch (error) {
        console.error("Failed to fetch Allotment posts", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleDeletePost = async (postId) => {
    await postDeletion(postId);
    fetchPosts();
  };

  const handleAddPost = async (newPost) => {
    await postAddition(newPost);
    fetchPosts();
  };

  if (error) {
    return (
      <div className="flex flex-col text-center">
        <h1>!</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="allotment">
      <div className="bg-green-900 flex justify-center p-2 mb-4">
        <h1 className="mb-0 text-white font-thin">{site}</h1>
      </div>
      <div className="post-display-container">
        <PostDisplay
          posts={allotmentPostsArray}
          handleDeletePost={handleDeletePost}
          isLoading={isLoading}
        />
      </div>
      {user && user.allotments.allotment_name === site && (
        <div className="post-submit-container">
          <PostSubmit scope={"allotment"} onAddPost={handleAddPost} />
        </div>
      )}
    </div>
  );
}
