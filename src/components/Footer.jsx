import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer
      className="bg-success text-white text-center p-3 mt-4"
      style={{ maxHeight: "100%" }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>About</div>
            <div className="mt-3">Offer Your Support</div>
          </div>
          <div className="col">
            <div>Privacy Policy</div>
            <div className="mt-3">Cookie Policy</div>
          </div>
          <div className="col">
            <div>Contact</div>
            <div className="mt-3"></div>
          </div>
        </div>
        <div className="mt-3">&copy; 2022 The Cooking Pot CIC. All rights reserved.</div>
      </div>
    </footer>
  );
}
