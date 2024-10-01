import React from "react";
import PostCard from "./PostCard";
import { useAuth } from "../AuthContext";

export default function PostDisplay({ posts }) {
  return (
    <div className="mt-4">
      {posts.map((post) => {
        if (!post.is_reply) {
          return (
            <div key={post.post_id}>
              <PostCard post={post} />
            </div>
          );
        }
      })}
    </div>
  );
}
