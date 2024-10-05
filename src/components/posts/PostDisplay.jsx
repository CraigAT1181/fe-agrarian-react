import React, { useState } from "react";
import PostCard from "./PostCard";
import PostSubmit from "./PostSubmit";

const PostDisplay = ({ posts = [], onDeletePost }) => {
  
  
  // const [replyingTo, setReplyingTo] = useState(null);
  // const [scope, setScope] = useState(null);

  // const handleReply = (postId, scope) => {
  //   setReplyingTo(postId); // Set the post ID to reply to
  //   setScope(scope);
  // };

  // const handleAddPost = async (newPostContent) => {
  //   await onAddPost({ content: newPostContent, parentId: replyingTo }); // Include parent ID in new post details
  //   setReplyingTo(null); // Reset replying state after adding the post
  //   setScope(null);
  // };

  return (
    <div className="post-display">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.post_id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Posts will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default PostDisplay;
