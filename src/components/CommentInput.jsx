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
   
>
      <form
        onSubmit={handleSend}
        >
        <div
    
        >
          <label
            htmlFor="comment-input"
          
          ></label>
          <input
            id="comment-input"
          
            type="text"
            placeholder="Type a comment here"
            value={commentInput}
            onChange={handleChange}
           
          />
          <button
            id="comment-button"
           
            type="submit"
           >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
