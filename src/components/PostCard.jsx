import React from "react";
import "../App.css";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";
import { deletePost } from "../api/api";
import MessageButtonL from "./MessageButtonL";

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
        <p className="text-sm text-green-950">{formattedDate}</p>
      </div>
      <div className="post-card-user-banner">
        <div className="flex-col">
          <p className="text-white text-sm my-2">{post.posted_by}</p>
          <p className="text-white text-sm my-2">{post.postcode}</p>
        </div>
        <div className="post-card-user-banner-text">
          {user &&
            (user.userID === post.user_id ? (
              <button onClick={() => handleDelete(post.post_id)}>
                <i className="fa-solid xl fa-trash"></i>
              </button>
            ) : (
              <MessageButtonL partner={post.user_id} />
            ))}
        </div>
      </div>
    </div>
  );
}
