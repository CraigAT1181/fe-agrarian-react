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
  const [viewReplies, setViewReplies] = useState({});
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
      })
      .catch(({ response: { status, data: { message } } }) => {
        setIsLoading(false);
        setError({ status, message: message });
      });
  };

  const toggleViewReplies = (commentId) => {
    setViewReplies((prevViewReplies) => ({
      ...prevViewReplies,
      [commentId]: !prevViewReplies[commentId],
    }));
  };

  const rootComments = blogComments.filter(
    (comment) => comment.parent_comment_id === null
  );

  const replies = (parentId) =>
    blogComments.filter((comment) => comment.parent_comment_id === parentId);

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

    const renderComments = (comments, parentCommentId) => {
      return comments.map((comment) => (
        <div key={comment.comment_id}>
          <CommentsCard
            blog_id={blog_id}
            comment={comment}
            allComments={blogComments}
            setCommentDeleted={setCommentDeleted}
            commentDeleted={commentDeleted}
            replyPosted={replyPosted}
            setReplyPosted={setReplyPosted}
            toggleViewReplies={toggleViewReplies}
            viewReplies={viewReplies[comment.comment_id] || false}
            isChild={parentCommentId !== null}
            
          />
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
