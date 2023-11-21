import React from "react";
import UserCard from "./UserCard";

export default function MessagePanel() {
  // User data passed in from map click
  // Data used to populate UserCard
  // UserCard displayed at top, above a message display, input box and submit button

  return (
    <section
      id="message-panel"
      className="container m-0 mt-5 border d-flex justify-content-center" style={{height: "400px", overflow: scroll, width: "400px"}}>
      <UserCard />
    </section>
  );
}
