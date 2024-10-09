import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

export default function NavbarHeader({ pageTitle }) {
  const { user } = useAuth();
  return (
    <nav className="navbar">
      <Link
        to={`/allotments/${user?.allotments.allotment_name}`}
        className={`nav-item ${
          pageTitle === "Allotment" ? "selected-nav-item" : ""
        }`}
      >
        Allotment
      </Link>

      <Link
        to={`/towns/${user?.towns.town_name}`}
        className={`nav-item ${
          pageTitle === "Town" ? "selected-nav-item" : ""
        }`}
      >
        Town
      </Link>
      <Link
        to="/posts"
        className={`nav-item ${
          pageTitle === "Posts" ? "selected-nav-item" : ""
        }`}
      >
        Ads
      </Link>
      <Link
        to="/blogs"
        className={`nav-item ${
          pageTitle === "Blogs" ? "selected-nav-item" : ""
        }`}
      >
        Blogs
      </Link>
      <Link
        to="/bookmarks"
        className={`nav-item ${
          pageTitle === "Activities" ? "selected-nav-item" : ""
        }`}
      >
        Bookmarks
      </Link>

      <Link
        to="/inbox"
        className={`nav-item ${
          pageTitle === "Messenger" ? "selected-nav-item" : ""
        }`}
      >
        Inbox
      </Link>
      <Link
        to="/notifications"
        className={`nav-item ${
          pageTitle === "Messenger" ? "selected-nav-item" : ""
        }`}
      >
        Notifications
      </Link>
    </nav>
  );
}
