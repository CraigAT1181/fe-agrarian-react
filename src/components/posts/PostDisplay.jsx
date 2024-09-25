import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

export default function PostDisplay({ posts }) {
  console.log("Posts passed into PostDisplay:", posts);
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="mt-4">
      {posts.map((post) => {
        if (!post.is_reply) {
          return (
            <div key={post.post_id}>
              <PostCard post={post} handlePostClick={handlePostClick} />
            </div>
          );
        }
      })}
    </div>
  );
}
