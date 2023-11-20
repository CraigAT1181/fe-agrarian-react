import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className="m-auto">
        <Link to="/">Home</Link> | <Link to="#">Garden</Link> |{" "}
        <Link to="#">Encyclopedia</Link>
      </ul>
    </nav>
  );
}
