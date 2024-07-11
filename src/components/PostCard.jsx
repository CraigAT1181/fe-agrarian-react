import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import { deletePost } from "../api/api";
import MessageButton from "./MessageButton";

export default function PostCard({ post, setPostDeleted }) {
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  const handleDelete = (post_id) => {
    deletePost(post_id).then(() => {
      setPostDeleted(true);
    });
  };

  return (
    <div className="post-card">
      <div>
        <img
          src="/bg-1.jpg"
          alt="Cooking Pot Logo"
          className="post-card-image"
        />
      </div>
      <div className="post-card-status-banner">
        <p className="text-white m-2">{post.status}</p>

        <p className="text-white m-2">{post.type}</p>
      </div>
      <div className="p-2 flex-grow">
        <div className="flex-col text-center">
          <h5 className="text-2xl">{post.item}</h5>

          <span>{post.body}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-green-900 mb-1">{formattedDate}</p>
      </div>
      <div className="flex justify-between p-2">
        <p className="text-green-900 text-sm mb-0">{post.posted_by}</p>
        <p className="text-green-900 text-sm mb-0">{post.postcode}</p>
      </div>
      {user && (
        <div className="post-card-user-banner">
          <div className="post-card-user-banner-text">
            {user &&
              (user.userID === post.user_id ? (
                <button onClick={() => handleDelete(post.post_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              ) : (
                <MessageButton
                  partner={post.user_id}
                  size={"s"}
                  colour={"white"}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
