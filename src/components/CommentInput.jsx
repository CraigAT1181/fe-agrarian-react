import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { postComment } from "../api/api";
import "../App.css";

export default function CommentInput({ blog_id, setCommentPosted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState("");

  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      setIsLoading(true);
      postComment(blog_id, user.userID, commentInput)
        .then((data) => {
          
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
  }

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Sending your message...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
<div className="comment-input-card" style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
  <form onSubmit={handleSend} style={{ flex: "1" }}>
    <div className="input-group" style={{ display: "flex" }}>
      <label
        htmlFor="comment-input"
        className="form-label"
        style={{ display: "none" }}></label>
      <input
        id="comment-input"
        className="comment-form-control"
        type="text"
        placeholder="Type your comment here"
        value={commentInput}
        onChange={handleChange}
        style={{ flex: "1" }}
      />
      <button
        id="comment-button"
        className="btn btn-success"
        type="submit"
        style={{ flex: "0 0 auto", marginLeft: "5px" }}>
        Post
      </button>
    </div>
  </form>
</div>

  );
}
