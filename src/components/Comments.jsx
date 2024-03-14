import React, { useState } from "react";
import CommentsDisplay from "./CommentsDisplay";
import { useAuth } from "./AuthContext";
import CommentInput from "./CommentInput";
import { useNavigate } from "react-router-dom";
import { postComment } from "../api/api";

export default function Comments({ blog_id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentPosted, setCommentPosted] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
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
    <div
      className="container p-4"
      style={{ backgroundImage: "url(/bg-1.jpg)", backgroundSize: "cover" }}>
      <div>
        {user ? (
          <div className="d-flex justify-content-center">
            <CommentInput
              commentInput={commentInput}
              onPostComment={onPostComment}
              setCommentInput={setCommentInput}
            />
          </div>
        ) : (
          <div
            className="text-center"
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              marginBottom: "2rem",
              padding: "2rem",
            }}>
            <h5 className="mb-3">Join the Community to Comment</h5>
            <div className="d-flex justify-content-center flex-md-row">
              <button
                onClick={() => navigate("/login")}
                className="btn bg-success text-white mx-1 fw-bold">
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn bg-success text-white mx-1 fw-bold">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <CommentsDisplay
          blog_id={blog_id}
          commentPosted={commentPosted}
        />
      </div>
    </div>
  );
}
