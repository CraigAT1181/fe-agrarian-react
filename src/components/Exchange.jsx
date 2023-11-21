import React from "react";
import Maps from "./Maps";
import MessagePanel from "./MessagePanel";

export default function Exchange() {
  return (
    <>
      <section className="container">
        <Maps />
        <MessagePanel />
      </section>
    </>
  );
}
