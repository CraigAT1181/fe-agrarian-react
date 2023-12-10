import React from "react";
import { useNavigate } from "react-router";

export default function ErrorHandling() {
  const navigate = useNavigate();
  return (
    <section className="d-flex align-items-center justify-content-center">
      <div
        className="d-flex-col text-center"
        style={{ height: "500px", width: "500px" }}
      >
        <h3>Oops, we've taken a wrong turn...</h3>
        <p>Click the button to return Home</p>
        <button
          onClick={() => {
            navigate("/home");
          }}
          className="btn btn-success"
        >
          Home
        </button>
      </div>
    </section>
  );
}
