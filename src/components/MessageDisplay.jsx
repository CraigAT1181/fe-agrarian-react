import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function MessageDisplay() {
  const { partner, conversationID } = useParams();
  const { selectedConversation } = useAuth();

  console.log(selectedConversation);

  return (
    <div className="message-display-container">
      <h1>{partner}</h1>

      {/* <MessageList /> */}
      <MessageInput />
    </div>
  );
}
