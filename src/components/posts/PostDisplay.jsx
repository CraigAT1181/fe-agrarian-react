import React from "react";
import PostCard from "./PostCard";

export default function PostDisplay({ posts = [], handleDeletePost }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="post-display">
          {posts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Posts will appear here.</p>
        </div>
      )}
    </>
  );
}
