import React from "react";
import UserCard from "./UserCard";

export default function UserDetails() {
  return (
    <section
      id="user-details"
      className="border border-primary"
      style={{ overflow: scroll}}>
      <UserCard />
    </section>
  );
}
