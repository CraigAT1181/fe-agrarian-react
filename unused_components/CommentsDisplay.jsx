import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import CommentsCard from "./CommentsCard";
import { getCommentsByBlogID } from "../api/api";

export default function CommentsDisplay({ blog_id }) {
  // State to manage loading status, error, blog comments, and various flags
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [replyPosted, setReplyPosted] = useState(false);
  const [viewReplies, setViewReplies] = useState({});
  const { commentPosted } = useAuth();

  // Fetch blog comments when component mounts or when certain dependencies change
  useEffect(() => {
    fetchBlogComments();
    setCommentDeleted(false);
  }, [commentPosted, commentDeleted, replyPosted]);

  // Function to fetch comments from the API
  const fetchBlogComments = () => {
    getCommentsByBlogID(blog_id)
      .then(({ comments }) => {
        setBlogComments(comments);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setError({ status, message });
          setIsLoading(false);
        }
      );
  };

  // Toggle the visibility of replies for a specific comment
  const toggleViewReplies = (commentId) => {
    setViewReplies((prevViewReplies) => ({
      ...prevViewReplies,
      [commentId]: !prevViewReplies[commentId],
    }));
  };

  // Get root comments (those with no parent)
  const rootComments = blogComments.filter(
    (comment) => comment.parent_comment_id === null
  );

  // Get replies for a specific parent comment
  const replies = (parentId) =>
    blogComments.filter((comment) => comment.parent_comment_id === parentId);

  if (isLoading) {
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );
  }

  // Recursive function to render comments and their nested replies
  const renderComments = (comments, parentCommentId) => {
    return comments.map((comment) => (
      <div key={comment.comment_id}>
        <CommentsCard
          blog_id={blog_id}
          comment={comment}
          allComments={blogComments}
          setCommentDeleted={setCommentDeleted}
          setReplyPosted={setReplyPosted}
          toggleViewReplies={toggleViewReplies}
          viewReplies={viewReplies[comment.comment_id] || false}
          isChild={parentCommentId !== null}
        />
        {/* Render nested replies if they are visible */}
        {viewReplies[comment.comment_id] && (
          <div className="nested-comments-wrapper">
            <div className="vertical-line"></div>
            <div className="nested-comments">
              {renderComments(replies(comment.comment_id), comment.comment_id)}
            </div>
          </div>
        )}
      </div>
    ));
  };

  // Render root comments or a message if no comments are present
  return (
    <div>
      {rootComments.length > 0 ? (
        renderComments(rootComments, null)
      ) : (
        <div>
          <span>No one has commented on this blog yet.</span>
        </div>
      )}
    </div>
  );
}
