import React from "react";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
}
