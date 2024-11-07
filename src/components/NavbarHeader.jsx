import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

export default function NavbarHeader({ pageTitle, unreadCount }) {
  const { user } = useAuth();
  return (
    <nav className="navbar">
      <Link
        to={`/allotments/${user?.allotments.allotment_name}`}
        className={`nav-item ${
          pageTitle === "Allotments" ? "selected-nav-item" : ""
        }`}
      >
        Allotment
      </Link>

      <Link
        to={`/towns/${user?.towns.town_name}`}
        className={`nav-item ${
          pageTitle === "Towns" ? "selected-nav-item" : ""
        }`}
      >
        Town
      </Link>
      <Link
        to="/ads"
        className={`nav-item ${pageTitle === "Ads" ? "selected-nav-item" : ""}`}
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
          pageTitle === "Bookmarks" ? "selected-nav-item" : ""
        }`}
      >
        Bookmarks
      </Link>

      <Link
        to="/inbox"
        className={`nav-item ${
          pageTitle === "Inbox" ? "selected-nav-item" : ""
        }`}
      >
        Inbox
      </Link>
      <Link
        to="/notifications"
        className={`nav-item ${
          pageTitle === "Notifications" ? "selected-nav-item" : ""
        }`}
      >
        Notifications
      </Link>
    </nav>
  );
}
