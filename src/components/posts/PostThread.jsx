import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../api/api";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostThread() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [parentPost, setParentPost] = useState(null);
  const [replies, setReplies] = useState([]);

  const { postId } = useParams();

  const navigate = useNavigate();

  const selectedPostRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    fetchSinglePost(postId)
      .then(({ data: { post, parentPost, replies } }) => {
        setIsLoading(false);
        setSelectedPost(post);
        console.log("post:", post);
        console.log("parent post:", parentPost);
        console.log("replies:", replies);
        setParentPost(parentPost || null);
        setReplies(replies);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });

    const handleBackButton = (e) => {
      e.preventDefault();
      navigate(-1);
    };

    if (selectedPostRef.current) {
      selectedPostRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Attach event listener on mount
    window.addEventListener("popstate", handleBackButton);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [postId]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-thread-container">
      <div className="flex justify-end pb-2">
        <button
          className="flex border-2 border-gray-700 rounded-full px-8 relative"
          onClick={() => navigate(-1)}>
          <i className="fa-solid absolute top-1 left-1 fa-chevron-left"></i>
          <span>Back</span>
        </button>
      </div>
      {/* {parentPost && (
        <div className="parent-post-container">
          <div onClick={() => handlePostClick(parentPost.post_id)}>
            <PostCard
              post={parentPost}
              parentName={parentPost?.users?.user_name}
              handlePostClick={handlePostClick}
            />
          </div>
          <hr className="mb-4" />
        </div>
      )} */}
      {selectedPost && (
        <div
          className="selected-post-container"
          ref={selectedPostRef}>
          <div onClick={() => handlePostClick(selectedPost.post_id)}>
            <PostCard
              post={selectedPost}
              parentName={parentPost?.users?.user_name}
              handlePostClick={handlePostClick}
            />
          </div>
        </div>
      )}
      <hr className="border-4" />
      <div className="replies-container">
        {replies &&
          replies.map((reply) => (
            <div
              key={reply.post_id}
              onClick={() => handlePostClick(reply.post_id)}>
              <PostCard
                post={reply}
                parentName={selectedPost.users.user_name}
                handlePostClick={handlePostClick}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
