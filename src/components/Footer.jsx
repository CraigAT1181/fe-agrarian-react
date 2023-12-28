import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="bg-success text-white text-center py-3">
      <div className="row">
        <div className="col">
          <p>About</p>
        </div>
        <div className="col">
          <p>Contact</p>
        </div>
      </div>
      <div className="container">
        <p>&copy; 2024 Agrarian. All rights reserved.</p>
      </div>
    </footer>
  );
}
