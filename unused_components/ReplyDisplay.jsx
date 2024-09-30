import React, { useEffect } from "react";
import CommentsCard from "./CommentsCard";

export default function ReplyDisplay({
  blog_id,
  comment,
  allComments,
  setCommentDeleted,
  replyPosted,
  setReplyPosted
}) {
  return (
    <div className="bg-subtle-success">
      {allComments.length > 0 &&
        allComments.map((reply) => {
          return (
            reply.parent_comment_id === comment.comment_id && (
              <div key={reply.comment_id}>
                <CommentsCard
                  blog_id={blog_id}
                  comment={reply}
                  allComments={allComments}
                  setCommentDeleted={setCommentDeleted}
                  replyPosted={replyPosted}
                  setReplyPosted={setReplyPosted}
                />
              </div>
            )
          );
        })}
    </div>
  );
}
