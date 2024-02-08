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
        <div className="row">
          <div className="col">
            <div>
              <button
                className="btn btn-light text-success fw-bold"
                onClick={() => navigate("/about")}>
                About
              </button>
            </div>
            <div>
              <button
                className="mt-3 btn btn-light text-success fw-bold"
                onClick={() => navigate("/offer-support")}>
                Offer Support
              </button>
            </div>
          </div>
          <div className="col">
            <div>
              <button
                className="btn btn-light text-success fw-bold"
                onClick={() => navigate("/privacy")}>
                Privacy Policy
              </button>
            </div>
            <div>
              <button
                className="mt-3 btn btn-light text-success fw-bold"
                onClick={() => navigate("/cookies")}>
                Cookie Policy
              </button>
            </div>
          </div>
          <div className="col">
            <div>
              <button
                className="btn btn-light text-success fw-bold"
                onClick={() => navigate("/contact")}>
                Contact
              </button>
            </div>
            <div>
              <button
                className="mt-3 btn btn-light text-success fw-bold"
                onClick={() => navigate("/suggestions")}>
                Make a Suggestion
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          &copy; 2022 The Cooking Pot CIC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
