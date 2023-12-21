import React from "react";
import "../App.css";

export default function PostCard({ post }) {
  console.log({ post });
  return (
    <article className="container post-card">
      <div className="row m-4">
        <div className="col text-start">{post.status}</div>
        <div className="col">
          <h5>{post.item}</h5>
        </div>
        <div className="col text-end">{post.type}</div>
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
          <p className="mb-0">{post.posted_by}<br />
          {post.postcode}</p>
        </div>
        <div className="col align-self-center">
          <button className="btn btn-success">message</button>
        </div>
        <div className="col text-end align-self-center">
          Posted: {post.created_at}
        </div>
      </div>
    </article>
  );
}
