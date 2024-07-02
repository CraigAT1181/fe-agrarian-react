import React, { useState } from "react";
import { postComment } from "../api/api";
import { useAuth } from "./AuthContext";

export default function CommentInput({ blog_id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const { user, setCommentPosted } = useAuth();
  let parent_comment_id;

  const onPostComment = () => {
    if (commentInput.trim() !== "") {
      setIsLoading(true);
      postComment(blog_id, user.userID, commentInput, parent_comment_id)
        .then(() => {
          setIsLoading(false);
          setCommentPosted(true);
        })
        .catch(
          ({
            response: {
              status,
              data: { message },
            },
          }) => {
            setIsLoading(false);
            setError({ status, message });
          }
        );
      setCommentInput("");
      setCommentPosted(false);
    }
  };

  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    onPostComment();
  }

  if (isLoading)
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Posting your comment...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="my-4">
      <div className="mb-2 text-center">
        <span className="font-semibold">Leave a comment</span>
      </div>
      <form onSubmit={handleSend}>
        <div className="w-full relative">
          <label
            htmlFor="comment-input"
            className="form-label"></label>
          <input
            id="comment-input"
            className="comment-input-box"
            type="text"
            placeholder="Type a comment here"
            value={commentInput}
            onChange={handleChange}
          />
          {commentInput && (
            <button
              id="comment-button"
              className="post-comment-button"
              type="submit">
              <i className="fa-solid fa-xl text-green-950 fa-arrow-right"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
