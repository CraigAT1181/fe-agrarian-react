import React from "react";
import { useAuth } from "./AuthContext";
import CommentInput from "./CommentInput";
import CommentsDisplay from "./CommentsDisplay";

export default function Comments({ blog_id }) {
  // Retrieve user info from AuthContext
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-center">
        {user ? (
          <div>
            {/* If the user is logged in, display the CommentInput component */}
            <CommentInput blog_id={blog_id} />
          </div>
        ) : (
          <div className="join-to-comment">
            {/* If the user is not logged in, prompt them to join the community */}
            <h5 className="text-white p-2 m-0">
              Join the Community to Comment
            </h5>
          </div>
        )}
      </div>
      <div>
        {/* Always display the CommentsDisplay component to show existing comments */}
        <CommentsDisplay blog_id={blog_id} />
      </div>
    </div>
  );
}
