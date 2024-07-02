import React from "react";
import { useAuth } from "./AuthContext";
import CommentInput from "./CommentInput";
import CommentsDisplay from "./CommentsDisplay";

export default function Comments({ blog_id }) {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-center">
        {user ? (
          <div>
            <CommentInput blog_id={blog_id}/>
          </div>
        ) : (
          <div className="join-to-comment">
            <h5 className="text-white p-2 m-0">
              Join the Community to Comment
            </h5>
          </div>
        )}
      </div>
      <div>
        <CommentsDisplay blog_id={blog_id} />
      </div>
    </div>
  );
}
