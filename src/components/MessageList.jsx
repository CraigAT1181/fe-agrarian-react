import React from "react";

export default function MessageList({ messages }) {
  return (
    <ul>
      {messages.map((message, index) => {
        return <li key={index}>{message}</li>;
      })}
    </ul>
  );
}
