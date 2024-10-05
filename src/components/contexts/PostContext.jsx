import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, deletePost } from "../../api/api";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const navigate = useNavigate();

  const postAddition = async (newPostDetails) => {
    try {
      await addPost(newPostDetails);
    } catch (error) {
      console.error("Failed to add post", error);
    }
  };

  const postDeletion = async (postId) => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <PostContext.Provider
      value={{ postAddition, postDeletion, handlePostClick }}>
      {children}
    </PostContext.Provider>
  );
};
