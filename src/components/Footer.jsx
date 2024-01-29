import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="bg-success text-white text-center p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p>About</p>
          </div>
          <div className="col">
            <p>Contact</p>
          </div>
        </div>
        <div>
          <p className="m-0">&copy; 2024 CropSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
