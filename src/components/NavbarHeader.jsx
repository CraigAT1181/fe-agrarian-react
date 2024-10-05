import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

export default function NavbarHeader({ pageTitle }) {
  const { user } = useAuth();
  return (
    <nav className="navbar">
      {user && (
        <Link
          to="/home"
          className={`nav-item ${
            pageTitle === "Home" ? "selected-nav-item" : ""
          }`}>
          Home
        </Link>
      )}

      <Link
        to="/exchange"
        className={`nav-item ${
          pageTitle === "Exchange" ? "selected-nav-item" : ""
        }`}>
        Exchange
      </Link>
      <Link
        to="/posts"
        className={`nav-item ${
          pageTitle === "Posts" ? "selected-nav-item" : ""
        }`}>
        Posts
      </Link>
      <Link
        to="/blogs"
        className={`nav-item ${
          pageTitle === "Blogs" ? "selected-nav-item" : ""
        }`}>
        Blogs
      </Link>
      <Link
        to="/activities"
        className={`nav-item ${
          pageTitle === "Activities" ? "selected-nav-item" : ""
        }`}>
        Activities
      </Link>
      {user && (
        <Link
          to="/messenger"
          className={`nav-item ${
            pageTitle === "Messenger" ? "selected-nav-item" : ""
          }`}>
          Messenger
        </Link>
      )}
    </nav>
  );
}
