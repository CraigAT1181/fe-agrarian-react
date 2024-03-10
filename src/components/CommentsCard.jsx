import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import "../App.css";
import { deleteComment } from "../api/api";
import MessageButton from "./MessageButton";
import { ButtonGroup } from "react-bootstrap";

export default function CommentsCard({ comment, setCommentDeleted }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(comment.date_posted), {
    addSuffix: true,
  });

const handleEdit = () => {

}

const handleDelete = (blog_id, comment_id) => {
  setIsLoading(true)
  deleteComment(blog_id, comment_id).then(()=>{
    setIsLoading(false);
    setCommentDeleted(true);
  })
}

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
    <div className="comment-card">
      <div className="row">
        <div className="d-flex justify-content-between">
          <div>
            <div>
              <h5 style={{ marginBottom: "0" }}>{comment.username}</h5>
            </div>
            <div>
              <p style={{ fontSize: "14px" }}>{formattedDate}</p>
            </div>
          </div>
          {user && user.userID !== comment.user_id && (
            <div>
              <MessageButton partner={comment.user_id} />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div>{comment.comment}</div>
      </div>
      {user && user.username === comment.username && (
        <div className="row">
          <div className="d-flex justify-content-end mt-4">
            <ButtonGroup>
              <button 
              className="btn btn-outline-danger fw-bold"
              onClick={() => handleDelete(comment.blog_id, comment.comment_id)}>
                {isLoading ? (<i className="fa-solid fa-spinner fa-spin"></i>) : ("Delete") }
              </button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  );
}
