import React from "react";
import { useAuth } from "./AuthContext";

export default function MessageList({ messages }) {
  const { user } = useAuth();

  return (
    <div>
      {messages.map((message, index) => {
        return message.sender_id === user.user_id ? (
          <div className="d-flex justify-content-start">
            <div
              key={index}
              className="bg-success-subtle rounded p-2 mb-2 w-75">
              <p style={{ fontSize: "12px" }}>{message.sender_name}</p>
              <p>{message.message}</p>
              <p style={{ fontSize: "12px" }}>{message.created_at}</p>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <div
              key={index}
              className="bg-success-subtle rounded p-2 mb-2 w-75">
              <p style={{ fontSize: "12px" }}>{message.sender_name}</p>
              <p>{message.message}</p>
              <p style={{ fontSize: "12px" }}>{message.created_at}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
