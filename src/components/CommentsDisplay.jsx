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
  const [nestedComments, setNestedComments] = useState([]);
  const { commentPosted } = useAuth();

  useEffect(() => {
    fetchBlogComments();

    setCommentDeleted(false);
  }, [commentPosted, commentDeleted, replyPosted]);

  const fetchBlogComments = () => {
    getCommentsByBlogID(blog_id)
      .then(({ comments }) => {
        setIsLoading(false);

        setBlogComments(comments);

        const nestedCommentfunc = transformComments(comments);
        setNestedComments(nestedCommentfunc);
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
  };

  const transformComments = (comments) => {
    const commentMap = new Map();
    const rootComments = [];

    // Initialize the map with all comments
    comments.forEach((comment) => {
      comment.replies = [];
      commentMap.set(comment.comment_id, comment);
    });

    // Build the tree structure
    comments.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parentComment = commentMap.get(comment.parent_comment_id);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

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
      {nestedComments.length > 0 ? (
        nestedComments.map(
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
