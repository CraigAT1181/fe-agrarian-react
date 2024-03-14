import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import "../App.css";
import { deleteComment } from "../api/api";
import MessageButtonS from "./MessageButtonS";
import ReplyDisplay from "./ReplyDisplay";
import ReplyInputModal from "./ReplyInputModal";

export default function CommentsCard({
  blog_id,
  comment,
  allComments,
  setCommentDeleted,
  commentDeleted,
  replyPosted,
  setReplyPosted,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewReplies, setViewReplies] = useState(false);
  const [viewRepliesButton, setViewRepliesButton] = useState("View Replies");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(comment.date_posted), {
    addSuffix: true,
  });

  const handleViewReplies = () => {
    if (!viewReplies) {
      setViewReplies(true);
      setViewRepliesButton("Hide Replies");
    } else {
      setViewReplies(false);
      setViewRepliesButton("View Replies");
    }
  };

  const handleDelete = (blog_id, comment_id) => {
    setIsLoading(true);
    deleteComment(blog_id, comment_id)
      .then(() => {
        setIsLoading(false);
        setCommentDeleted(true);
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
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
    <div>
      <div className="comment-card">
        <div className="row">
          <div className="d-flex justify-content-between">
            <div className="col">
              <div className="d-flex">
                <h5 style={{ marginBottom: "0" }}>{comment.username}</h5>
                <MessageButtonS partner={comment.user_id} />
              </div>
              <div>
                <p style={{ fontSize: "14px" }}>{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div>{comment.comment}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex">
            <button
              className="btn btn-outline-success"
              onClick={() => handleViewReplies()}>
              {`${
                allComments.filter(
                  (reply) => reply.parent_comment_id === comment.comment_id
                ).length
              } ${
                allComments.filter(
                  (reply) => reply.parent_comment_id === comment.comment_id
                ).length === 1
                  ? "reply"
                  : "replies"
              }`}
            </button>
            {user && user.userID !== comment.user_id && (
              <div className="mx-3">
                <button
                  className="btn "
                  type="button"
                  onClick={handleShow}>
                  <i className="fa-solid text-success fa-reply"></i>
                </button>
              </div>
            )}
            <ReplyInputModal
              show={showModal}
              handleClose={handleClose}
              blog_id={blog_id}
              parent_comment_id={comment.comment_id}
              comment_user={comment.username}
              setReplyPosted={setReplyPosted}
            />
          </div>

          {user && user.username === comment.username && (
            <div>
              <button
                className="btn text-danger fw-bold"
                onClick={() => handleDelete(blog_id, comment.comment_id)}
                title="Delete Comment">
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-trash"></i>
                )}
              </button>
            </div>
          )}
        </div>
        <div>
          {viewReplies && (
            <>
              <hr className="my-5" />
              <div>
                <ReplyDisplay
                  blog_id={blog_id}
                  comment={comment}
                  allComments={allComments}
                  setCommentDeleted={setCommentDeleted}
                  replyPosted={replyPosted}
                  setReplyPosted={setReplyPosted}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
