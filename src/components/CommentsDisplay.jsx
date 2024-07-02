import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CommentsCard from "./CommentsCard";
import { getCommentsByBlogID } from "../api/api";

export default function CommentsDisplay({ blog_id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [replyPosted, setReplyPosted] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const { commentPosted } = useAuth();

  useEffect(() => {
    getCommentsByBlogID(blog_id)
      .then(({ comments }) => {
        setIsLoading(false);

        setBlogComments(comments);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );

    setCommentDeleted(false);
  }, [commentPosted, commentDeleted, replyPosted]);

  if (isLoading)
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading comments...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div>
      {blogComments.length > 0 ? (
        blogComments.map(
          (comment) =>
            comment.parent_comment_id === null && (
              <div key={comment.comment_id}>
                <CommentsCard
                  blog_id={blog_id}
                  comment={comment}
                  allComments={blogComments}
                  setCommentDeleted={setCommentDeleted}
                  commentDeleted={commentDeleted}
                  replyPosted={replyPosted}
                  setReplyPosted={setReplyPosted}
                />
              </div>
            )
        )
      ) : (
        <div>
          <span>No one has commented on this blog yet.</span>
        </div>
      )}
    </div>
  );
}
