import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import PostSubmit from "./PostSubmit";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, parentName = null }) {
  const [replyingToPostId, setReplyingToPostId] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();

  const { user, toggleDrawer, handlePostClick, handleDeletePost } = useAuth();

  const handleImageClick = (e, mediaUrl) => {
    e.stopPropagation();
    setSelectedMedia(mediaUrl);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedMedia(null);
  };

  // ---------------- Format dates for rendering

  const formattedTime = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), {
        addSuffix: true,
      })
    : "just now";

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);
  }

  const formattedDate = formatDate(post.created_at);

  const handleReplyClick = (postId) => {
    if (user) {
      setReplyingToPostId(replyingToPostId === postId ? null : postId);
    } else {
      toggleDrawer();
    }
  };
  console.log("Post:", post, "profile_pic", post.users.profile_pic);
  return (
    <div className="post-card-container">
      <div className="min-w-16 mx-2">
        <img
          className="w-16 h-16 object-cover rounded"
          src={post.users.profile_pic}
          alt="profile pic"
          onClick={(e) => handleImageClick(e, post.users.profile_pic)}
        />
      </div>
      <div className="flex-grow w-fit">
        <div className="flex justify-between">
          <div className="flex justify-start items-center font-semibold">
            <p>{post.users.user_name}</p>
            <p className="mx-2">|</p>
            <p className="">
              {post.scope === "allotment"
                ? post.users.plot
                : post.users.allotments.allotment_name}
            </p>
          </div>

          <div className="relative inline-block mr-2">
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={toggleMenu}
            ></i>
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                <ul>
                  {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Edit Post
                    </li> */}
                  {user && user.user_name === post.users.user_name && (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation;
                        handleDeletePost(post.post_id);
                        navigate(-1);
                      }}
                    >
                      Delete Post
                    </li>
                  )}
                  {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Report Post
                    </li> */}
                </ul>
              </div>
            )}
          </div>
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
                  onClick={(e) => handleImageClick(e, media.media_url)}
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-sm font-semibold mb-0 mt-2">
          {formattedTime} <span className="font-thin">({formattedDate})</span>
        </p>

        <div className="flex justify-start mt-2">
          {/* Reply button */}
          <div
            className="flex items-center mb-0 mr-2 cursor-pointer"
            title="Reply"
            onClick={(e) => {
              e.stopPropagation();
              handleReplyClick(post.post_id);
            }}
          >
            <i className="fa-solid text-gray-400 fa-comment-dots"></i>
            <p className="mb-0 ml-1 font-thin text-sm">{post.reply_count}</p>
          </div>

          {/* Other buttons */}
          <div className="mb-0 ml-2 mr-4" title="Bookmark">
            <i className="fa-solid text-gray-400 fa-bookmark"></i>
          </div>
          <p className="m-0">|</p>
          <div className="mb-0 ml-4" title="Share">
            <i className="fa-solid text-gray-400 fa-share-from-square"></i>
          </div>
        </div>

        {/* Conditionally render reply input for this post */}
        {replyingToPostId === post.post_id && (
          <div>
            <PostSubmit parent_id={post.post_id} scope={post.scope} />
          </div>
        )}
      </div>
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <img
            src={selectedMedia}
            alt="Enlarged image"
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={(e) => closeModal(e)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
