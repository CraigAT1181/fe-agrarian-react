import React from "react";
import Maps from "./Maps";
import UserDetails from "./UserDetails";
import MessageInterface from "./MessageInterface";

export default function Exchange() {
  return (
    <>
      <section className="d-flex">
        <div className="border border-success" style={{width: "1fr"}}>
          <Maps />
          <UserDetails />
        </div>
        <div className="border border-warning" style={{width: "auto"}}>
          <MessageInterface />
        </div>
      </section>
    </>
  );
}
