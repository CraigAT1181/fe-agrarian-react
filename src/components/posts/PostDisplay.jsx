import React from "react";
import PostCard from "./PostCard";

export default function PostDisplay({
  posts = [],
  handleDeletePost,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col text-center">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Fetching posts, please wait...</p>
        </div>
      ) : (
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
              <p>No one has posted anything yet! Why don't you start us off?</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
