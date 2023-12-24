import React from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <nav>
      <ul className="nav d-flex justify-content-around p-4">
        <h5 className="nav-item m-0">
          <Link
            to="/"
            className="nav-link m-3">
            <li className="text-success">Home</li>
          </Link>
        </h5>
        <h5 className="nav-item m-0">
          <Link
            to="/exchange"
            className="nav-link m-3">
            <li className="text-success">Exchange</li>
          </Link>
        </h5>
        <h5 className="nav-item m-0">
          <Link
            to="/posts"
            className="nav-link m-3">
            <li className="text-success">Posts</li>
          </Link>
        </h5>
        {user ? (
          <h5 className="nav-item m-0">
            <Link
              to="/messenger"
              className="nav-link m-3">
              <li className="text-success">Messenger</li>
            </Link>
          </h5>
        ) : null}
      </ul>
    </nav>
  );
}
