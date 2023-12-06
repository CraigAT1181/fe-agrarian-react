import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className="nav d-flex justify-content-around p-4">
        <h5 className="nav-item">
          <Link
            to="/"
            className="nav-link m-3">
            <li className="text-success">Home</li>
          </Link>
        </h5>
        <h5 className="nav-item">
          <Link
            to="/exchange"
            className="nav-link m-3">
            <li className="text-success">Exchange</li>
          </Link>
        </h5>
        <h5 className="nav-item">
          <Link
            to="/messenger"
            className="nav-link m-3">
            <li className="text-success">Messenger</li>
          </Link>
        </h5>
      </ul>
    </nav>
  );
}
