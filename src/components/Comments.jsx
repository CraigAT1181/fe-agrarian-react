import React, { useState } from "react";
import CommentsDisplay from "./CommentsDisplay";
import { useAuth } from "./AuthContext";
import CommentInput from "./CommentInput";
import { useNavigate } from "react-router-dom";

export default function Comments({ blog_id, author_id }) {
  const [commentPosted, setCommentPosted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="p-5"
      style={{ backgroundImage: "url(/bg-1.jpg)", backgroundSize: "cover" }}>
      <div>
        {user ? (
          user.userID !== author_id ? (
            <div>
              <CommentInput
                blog_id={blog_id}
                setCommentPosted={setCommentPosted}
              />
            </div>
          ) : null
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
