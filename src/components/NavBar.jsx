import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg">
      <ul className="navbar-nav">
        <Link
          to="/"
          className="nav-link">
          <li className="nav-item text-white mx-3">Home</li>
        </Link>

        <Link
          to="/exchange"
          className="nav-link">
          <li className="nav-item text-white mx-3">Exchange</li>
        </Link>

        <Link
          to="/posts"
          className="nav-link">
          <li className="text-white mx-3">Posts</li>
        </Link>

        {user ? (
          <Link
            to="/messenger"
            className="nav-link">
            <li className="text-white mx-3">Messenger</li>
          </Link>
        ) : null}
      </ul>
    </nav>
  );
}
