import React from "react";
import "../App.css";

export default function CommentInput({ commentInput, onPostComment, setCommentInput }) {
  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    onPostComment();
  }

  return (
    <div
      className="comment-input-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "75%",
      }}>
      <form
        onSubmit={handleSend}
        style={{ flex: "1" }}>
        <div
          className="input-group"
          style={{ display: "flex" }}>
          <label
            htmlFor="comment-input"
            className="form-label"
            style={{ display: "none" }}></label>
          <input
            id="comment-input"
            className="comment-form-control"
            type="text"
            placeholder="Type a comment here"
            value={commentInput}
            onChange={handleChange}
            style={{ flex: "1", borderRadius: "25px" }}
          />
          <button
            id="comment-button"
            className="btn btn-success text-white"
            type="submit"
            style={{ flex: "0 0 auto", marginLeft: "5px" }}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
