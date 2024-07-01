import React from "react";

export default function CommentInput({
  commentInput,
  onPostComment,
  setCommentInput,
}) {
  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    onPostComment();
  }

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
              <i className="fa-solid fa-xl text-green-950 fa-circle-chevron-right"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
