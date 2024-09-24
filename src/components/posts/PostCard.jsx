import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import PostSubmit from "./PostSubmit";

export default function PostCard({ post, parentName = null, handlePostClick }) {
  const [replyingToPostId, setReplyingToPostId] = useState(null);

  // Format dates for rendering

  const formattedTime = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);
  }

  const formattedDate = formatDate(post.created_at);

  // Handle media upload

  // const handleMediaUpload = () => {};

  const handleReplyClick = (postId) => {
    // Toggle reply input for the selected post
    setReplyingToPostId(replyingToPostId === postId ? null : postId);
  };

  // Handle reply submission

  return (
    <div className="post-card-container relative">
      <div className="min-w-16 mx-2">
        <img
          className="w-16 h-16 object-cover rounded"
          src={post.users.profile_pic}
          alt="profile pic"
        />
      </div>
      <div className="flex-grow">
        <div className="flex lg:justify-start font-semibold">
          <p>{post.users.user_name}</p>
          <p className="mx-4 font-thin">{post.users.plot}</p>
        </div>
        {post.is_reply === true && parentName && (
          <div>
            <span className="text-sm font-thin mb-2">
              Replying to {parentName}
            </span>
          </div>
        )}
        <div onClick={() => handlePostClick(post.post_id)}>{post.content}</div>
        {post.posts_media && post.posts_media.length > 0 && (
          <div className="grid grid-cols-2 gap-1 md:flex">
            {post.posts_media.map((media) => (
              <div key={media.media_url}>
                <img
                  src={media.media_url}
                  alt="Attached media"
                  className="cursor-pointer w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-sm font-semibold mb-0 mt-2">
          {formattedTime} <span className="font-thin">({formattedDate})</span>
        </p>

        <div className="flex justify-between lg:justify-center mt-2">
          {/* Reply button */}
          <div
            className="flex items-center mb-0 lg:mx-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleReplyClick(post.post_id);
            }}
          >
            <i className="fa-solid text-gray-400 fa-comment-dots"></i>
            <p className="mb-0 ml-1 font-thin text-sm">{post.reply_count}</p>
          </div>

          {/* Other buttons */}
          <div className="mb-0 lg:mx-4">
            <i className="fa-solid text-gray-400 fa-bookmark"></i>
          </div>
          {"|"}
          <div className="mb-0 lg:mx-4">
            <i className="fa-solid text-gray-400 fa-share-from-square"></i>
          </div>
        </div>

        {/* Conditionally render reply input for this post */}
        {replyingToPostId === post.post_id && <PostSubmit />}
      </div>
    </div>
  );
}
