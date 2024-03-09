import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import "../App.css";
import MessageButton from "./MessageButton";
import { ButtonGroup, Button } from "react-bootstrap";

export default function CommentsCard({ comment }) {
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(comment.date_posted), {
    addSuffix: true,
  });

  console.log(comment);
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
          <div className="d-flex justify-content-end">
            <ButtonGroup>
              <button className="m-1 btn btn-outline-danger fw-bold">
                Delete
              </button>
              <button className="m-1 btn btn-warning text-white fw-bold">
                Edit
              </button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </div>
  );
}
