import React from "react";
import "../App.css";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "./AuthContext";

export default function PostCard({ post }) {
  const { user } = useAuth();

  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <article className="container post-card">
      <div className="row m-4">
        {post.status === "Available" ? (
          <div
            className="col text-start"
            style={{ color: "#28a745", fontWeight: "bold" }}>
            {post.status}
          </div>
        ) : (
          <div
            className="col text-start"
            style={{ color: "red", fontWeight: "bold" }}>
            {post.status}
          </div>
        )}

        <div className="col">
          <h5>{post.item}</h5>
        </div>
        {post.type === "Seed" ? (
          <div
            className="col text-end"
            style={{ color: "#6C757D", fontWeight: "bold" }}>
            {post.type}
          </div>
        ) : (
          <div
            className="col text-end"
            style={{ color: "#007BFF", fontWeight: "bold" }}>
            {post.type}
          </div>
        )}
      </div>
      <div className="row m-4">
        <div className="col"></div>
        <div className="col">
          <span>{post.body}</span>
        </div>
        <div className="col"></div>
      </div>
      <div className="row m-4">
        <div className="col text-start align-self-end">
          <p className="mb-0">
            {post.posted_by}
            <br />
            {post.postcode}
          </p>
        </div>
        <div className="col align-self-center">
          {user &&
            (user.user_id === post.user_id ? (
              <button className="btn btn-outline-danger">Delete Post</button>
            ) : (
              <button className="btn btn-success">Message</button>
            ))}
        </div>
        <div className="col text-end align-self-center">{formattedDate}</div>
      </div>
    </article>
  );
}
