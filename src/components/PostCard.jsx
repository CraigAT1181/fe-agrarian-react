import React, { useEffect, useState } from "react";
import "../App.css";
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
    <article className="container post-card">
      <div className="row m-4">
        {post.status === "Available" ? (
          <div
            className="col text-start"
            style={{ color: "#28a745", fontWeight: "bold" }}
          >
            {post.status}
          </div>
        ) : (
          <div
            className="col text-start"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {post.status}
          </div>
        )}

        <div className="col text-center">
          <h5>{post.item}</h5>
        </div>
        {post.type === "Seed" ? (
          <div
            className="col text-end"
            style={{ color: "#6C757D", fontWeight: "bold" }}
          >
            {post.type}
          </div>
        ) : (
          <div
            className="col text-end"
            style={{ color: "#007BFF", fontWeight: "bold" }}
          >
            {post.type}
          </div>
        )}
      </div>
      <div className="row m-4">
        <div className="col text-center">
          <span>{post.body}</span>
        </div>
      </div>
      <div className="row m-4">
        <div className="col text-start align-self-end">
          <p className="mb-0">
            {post.posted_by}
            <br />
            {post.postcode}
          </p>
        </div>
        <div className="col text-center">
          {user &&
            (user.user_id === post.user_id ? (
              <button
                onClick={() => handleDelete(post.post_id)}
                className="btn btn-outline-danger"
              >
                Delete Post
              </button>
            ) : (
              <MessageButton />
            ))}
        </div>
        <div className="col text-end align-self-center">{formattedDate}</div>
      </div>
    </article>
  );
}
