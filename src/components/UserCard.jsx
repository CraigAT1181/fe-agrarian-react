import React from "react";

export default function UserCard() {
  return (
    <>
      <section
        className="card border border-danger"
        style={{
          width: "auto",
          height: "5rem",
          margin: "1rem",
          padding: "0.5rem",
        }}>
        <div className="d-flex justify-content-center">
          <p>Ian Smith</p>
        </div>
      </section>
    </>
  );
}
