import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import CommentsCard from "./CommentsCard";
import { getCommentsByBlogID } from "../api/api";

export default function CommentsDisplay({ blog_id, commentPosted }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const [commentDeleted, setCommentDeleted] = useState(false);

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
  }, [commentPosted, commentDeleted]);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading comments...</p>
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
    <div>
      {blogComments.length > 0 ? (
        blogComments.map((comment) => (
          <div key={comment.comment_id}>
            <CommentsCard
              comment={comment}
              setCommentDeleted={setCommentDeleted}
            />
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center">
          <Alert variant="light">No one has commented on this blog yet.</Alert>
        </div>
      )}
    </div>
  );
}
