import React from "react";

export default function ContactList({ conversations }) {
  return (
    <ul>
      {conversations.map((conversation) => (
        <li key={conversation.conversation_id}>{conversation.body}</li>
      ))}
    </ul>
  );
}

