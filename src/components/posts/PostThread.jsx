import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchSelectedPost } from "../../api/api";
import PostCard from "./PostCard";

export default function PostThread() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [parentPost, setParentPost] = useState(null);
  const [replies, setReplies] = useState([]);

  const { user } = useAuth();

  const { postId } = useParams();

  const navigate = useNavigate();

  const selectedPostRef = useRef(null);

  useEffect(() => {
    const loadSelectedPost = async () => {
      setIsLoading(true);
      try {
        const {
          data: { post, parentPost, replies },
        } = await fetchSelectedPost(postId);

        setSelectedPost(post);
        setParentPost(parentPost || null);
        setReplies(replies);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch selected post", error);
        setError(error);
        setIsLoading(false);
      }
    };

    loadSelectedPost();

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
      <div className="flex justify-end">
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
          <div>
            <PostCard
              post={selectedPost}
              parentName={parentPost?.users?.user_name}
            />
          </div>
        </div>
      )}
      <hr className="border-4" />
      <div className="replies-container">
        {replies &&
          replies.map((reply) => (
            <div key={reply.post_id}>
              <PostCard
                post={reply}
                parentName={selectedPost.users.user_name}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
