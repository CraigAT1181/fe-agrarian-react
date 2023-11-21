import React from "react";

export default function UserCard() {
  // UserCard populated with User data from map click

  return (
    <>
      <section className="card" style={{width: "18rem", height: "5rem"}}>
        <p>Phil Cox</p>
        <button className="btn btn-light" style={{width: "10rem"}}>Message</button>
      </section>
    </>
  );
}
