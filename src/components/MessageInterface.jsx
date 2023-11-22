import React from "react";

export default function MessageInterface() {
  return (
    <>
      <section>
        <div
          id="message-container"
          style={{ width: "400px", height: "800px" }}></div>
        <form action="">
          <input type="text" />
          <button>Send</button>
        </form>
      </section>
    </>
  );
}
