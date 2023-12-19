import React from "react";

export default function PostCard({post}) {
    console.log({post});
  return (
    <div className="card">
        <div className="card-title">{post.type}</div>
        <div className="card-body">{post.body}</div>
        <div className="card-body">{post.posted_by}</div>
    </div>
  )
}
