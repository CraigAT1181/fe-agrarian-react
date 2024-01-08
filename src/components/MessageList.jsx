import React from "react";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <div>{message.sender_name}</div>
            <div>{message.message}</div>
            <div>{message.created_at}</div>
          </div>
        );
      })}
    </div>
  );
}
