import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function MessageDisplay() {
  const { partner, conversationID } = useParams();
  const { selectedConversation } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="message-display-container">
      <div
        className="flex items-center justify-end mb-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left"></i>
        <p className="mb-0 ml-2">back</p>
      </div>

      <h1>{partner}</h1>

      <MessageList conversationID={conversationID} />
      <MessageInput conversationID={conversationID} />
    </div>
  );
}
