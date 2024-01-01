import React from "react";
import { useAuth } from "./AuthContext";

export default function ContactList({ conversations }) {
  const { user } = useAuth();

  return (
    <div>
      {conversations.map((conversation) =>
        conversation.user1_id === user.user_id ? (
          <div key={conversation.conversation_id}>
            {conversation.user2_username}
          </div>
        ) : (
          <div key={conversation.conversation_id}>
            {conversation.user1_username}
          </div>
        )
      )}
    </div>
  );
}
