import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import { fetchSelectedPost } from "../../api/api";
import PostCard from "./PostCard";
import PostSubmit from "./PostSubmit";

export default function PostThread() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [parentPost, setParentPost] = useState(null);
  const [replies, setReplies] = useState([]);

  const { user } = useAuth();
  const { postAddition, postDeletion } = usePosts();

  const { postId } = useParams();

  const navigate = useNavigate();

  const selectedPostRef = useRef(null);

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

  useEffect(() => {
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

  const handleDeletePost = async (postId) => {
    await postDeletion(postId);
    loadSelectedPost();
  };

  const handleAddPost = async (newPost) => {
    await postAddition(newPost);
    loadSelectedPost();
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
    <div className="post-thread">
      <div className="flex justify-end">
        <button className="flex px-8 relative" onClick={() => navigate(-1)}>
          <i className="fa-solid absolute top-1 left-1 fa-chevron-left"></i>
          <span>Back</span>
        </button>
      </div>

      {selectedPost && (
        <div className="selected-post-container" ref={selectedPostRef}>
          <div>
            <PostCard
              post={selectedPost}
              parentName={parentPost?.users?.user_name}
              handleDeletePost={handleDeletePost}
            />
          </div>
        </div>
      )}
      <hr className="border-4" />
      {replies && (
        <div className="pl-4">
          <h4>
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </h4>
        </div>
      )}

      <div className="replies-display-container">
        {replies &&
          replies.map((reply) => (
            <div key={reply.post_id}>
              <PostCard
                post={reply}
                parentName={selectedPost.users.user_name}
                handleDeletePost={handleDeletePost}
              />
            </div>
          ))}
      </div>
      <div className="sticky bottom-4">
        {user && (
          <PostSubmit
            parent_id={selectedPost.post_id}
            parent_user_name={selectedPost.users.user_name}
            scope={"town"}
            onAddPost={handleAddPost}
          />
        )}
      </div>
    </div>
  );
}
