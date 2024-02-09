import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="bg-success text-white text-center p-3 mt-4"
      style={{ maxHeight: "100%" }}>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <div>
              <span
                className="text-white fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/about")}>
                About
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              <span
                className="text-white fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/privacy")}>
                Privacy Policy
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              <span
                className="text-white fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/contact")}>
                Contact
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span
              className="text-white fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/offer-support")}>
              Offer Support
            </span>
          </div>
          <div className="col">
            <div>
              <span
                className="text-white fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cookies")}>
                Cookie Policy
              </span>
            </div>
          </div>
          <div className="col">
            <span
              className="text-white fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/suggestions")}>
              Make a Suggestion
            </span>
          </div>
        </div>
        <div className="row">
          <div className="mt-3">
            &copy; 2022 The Cooking Pot CIC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
