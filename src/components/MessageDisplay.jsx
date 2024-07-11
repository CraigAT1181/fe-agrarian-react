import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function MessageDisplay() {
  return (
    <div className="message-display-container">
      <h1>Chat Partner Name</h1>

      <MessageList />
      <MessageInput />
    </div>
  );
}
