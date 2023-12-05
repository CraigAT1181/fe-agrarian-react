import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className="nav d-flex justify-content-around p-4">
        <h5 className="nav-item">
          <Link
            to="/"
            className="nav-link">
            <span className="text-success">Home</span>
          </Link>
        </h5>
        <h5 className="nav-item">
          <Link
            to="/exchange"
            className="nav-link">
            <span className="text-success">Exchange</span>
          </Link>
        </h5>
        <h5 className="nav-item">
          <Link
            to="/messenger"
            className="nav-link">
            <span className="text-success">Messenger</span>
          </Link>
        </h5>
      </ul>
    </nav>
  );
}
