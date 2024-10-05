import React, { useEffect, useState } from "react";
import { fetchAllotmentPosts } from "../api/api";

import { usePosts } from "./contexts/PostContext";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";

import PostDisplay from "./posts/PostDisplay";
import PostSubmit from "./posts/PostSubmit";

export default function Allotment() {
  const { postAddition, postDeletion } = usePosts();
  const { user } = useAuth();
  const { site } = useParams();
  const [allotmentPosts, setAllotmentPosts] = useState({});

  const allotmentPostsArray = Object.values(allotmentPosts).filter(
    (post) => post.scope === "allotment" && post.is_reply !== true
  );

  const fetchPosts = async () => {
    if (user) {
      try {
        const { posts: allotmentPostsData } = await fetchAllotmentPosts(
          user.allotment_id
        );
        console.log(allotmentPostsData);

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
        console.log(normalisedAllotmentPosts);

        setAllotmentPosts(normalisedAllotmentPosts);
      } catch (error) {
        console.error("Failed to fetch Allotment posts", error);
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

  return (
    <div className="allotment">
      <div className="bg-green-900 rounded-lg flex justify-center p-2 mb-4">
        <h1 className="mb-0 text-white font-thin">{site}</h1>
      </div>
      <PostDisplay
        posts={allotmentPostsArray}
        handleDeletePost={handleDeletePost}
      />
      <div className="sticky bottom-0">
        {user && <PostSubmit scope={"allotment"} onAddPost={handleAddPost} />}
      </div>
    </div>
  );
}
