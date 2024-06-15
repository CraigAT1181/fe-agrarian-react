import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link
        to="/"
        className="nav-item">
        Home
      </Link>
      <Link
        to="/exchange"
        className="nav-item">
        Exchange
      </Link>
      <Link
        to="/posts"
        className="nav-item">
        Posts
      </Link>
      <Link
        to="/blogs"
        className="nav-item">
        Blogs
      </Link>
      <Link
        to="/activities"
        className="nav-item">
        Activities
      </Link>
      <Link
        to="/messenger"
        className="nav-item">
        Messenger
      </Link>
    </nav>
  );
}
