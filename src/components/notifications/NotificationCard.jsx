import React, { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({ notification }) {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { user, toggleDrawer } = useAuth();
  const { handleNotificationClick } = useNotifications();

  const navigate = useNavigate();

  // ---------------- Format dates for rendering

  const formattedTime = notification.created_at
    ? formatDistanceToNow(new Date(notification.created_at), {
        addSuffix: true,
      })
    : "just now";

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);
  }

  const formattedDate = formatDate(notification.created_at);

  // ----------------------------------------------

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
            <p
              onClick={
                post.scope === "town"
                  ? () =>
                      navigate(
                        `/allotments/${post.users.allotments.allotment_name}`
                      )
                  : null
              }
            >
              {post.scope === "allotment"
                ? post.users.plot
                : post.users.allotments.allotment_name}
            </p>
          </div>
          {user && user.user_name === post.users.user_name && (
            <div className="relative inline-block mr-2">
              <i
                className="fa-solid fa-ellipsis-vertical"
                onClick={toggleMenu}
              ></i>
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-40 h-auto bg-white border border-gray-300 rounded shadow-lg z-50">
                  <ul className="p-0">
                    <li
                      className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation;
                        handleDeletePost(post.post_id);
                      }}
                    >
                      Delete Post
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        {post.is_reply === true && parentName && (
          <div>
            <span className="text-sm font-thin mb-2">
              Replying to {parentName}
            </span>
          </div>
        )}
        <div className="pb-2" onClick={() => handlePostClick(post.post_id)}>
          {post.content}
        </div>

        {post.posts_media && post.posts_media.length > 0 && (
          <div className="grid grid-cols-4 gap-1 md:flex">
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
            onClick={
              user
                ? (e) => {
                    e.stopPropagation();
                    handlePostClick(post.post_id);
                  }
                : (e) => {
                    e.stopPropagation();
                    toggleDrawer();
                  }
            }
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
