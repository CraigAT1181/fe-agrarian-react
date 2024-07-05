import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import { deleteComment } from "../api/api";
import ReplyInputModal from "./ReplyInputModal";

export default function CommentsCard({
  blog_id,
  comment,
  allComments,
  setCommentDeleted,
  commentDeleted,
  replyPosted,
  setReplyPosted,
  toggleViewReplies,
  viewReplies,
  isChild,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(comment.date_posted), {
    addSuffix: true,
  });

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
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  const replies = allComments.filter(
    (reply) => reply.parent_comment_id === comment.comment_id
  );

  return (
    <div
      className={`comment-card-container ${
        isChild ? "child-comment" : "parent-comment"
      } ${viewReplies ? "expanded" : ""}`}
      onClick={() => toggleViewReplies(comment.comment_id)}>
      <div className="flex justify-between">
        <div>
          <h5>{comment.username}</h5>
        </div>
        {user && user.userID !== comment.user_id ? (
          <div>
            <button
              type="button"
              onClick={handleShow}
              title="Reply">
              <i className="fa-solid text-green-900 fa-reply"></i>
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => handleDelete(blog_id, comment.comment_id)}
              title="Delete Comment">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid text-green-900 fa-trash"></i>
              )}
            </button>
          </div>
        )}
      </div>
      <div>
        <p>{comment.comment}</p>
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-end">
              <p className="mb-0">{formattedDate}</p>
            </div>
            <div className="flex items-end">
              {replies.length}{" "}
              <i className="fa-solid ml-2 text-green-900 fa-comments"></i>
            </div>
          </div>

          <ReplyInputModal
            show={showModal}
            handleClose={handleClose}
            blog_id={blog_id}
            parent_comment_id={comment.comment_id}
            comment_user={comment.username}
            setReplyPosted={setReplyPosted}
          />
        </div>
      </div>
    </div>
  );
}
