import React from "react";
import { useAuth } from "./AuthContext";
import "../App.css";

export default function ContactList({ conversations, setConversationID }) {
  const { user } = useAuth();

  return (
    <div>
      {conversations &&
        conversations.map((conversation, index) =>
          conversation.user1_id === user.user_id ? (
            index % 2 === 0 ? (
              <div
                key={index}
                className="bg-dark-subtle contact-list-item"
                onClick={() => {
                  setConversationID(conversation.conversation_id);
                }}>
                <div>{conversation.user2_username}</div>
              </div>
            ) : (
              <div
                key={index}
                className="bg-secondary-subtle contact-list-item"
                onClick={() => {
                  setConversationID(conversation.conversation_id);
                }}>
                <div>{conversation.user2_username}</div>
              </div>
            )
          ) : index % 2 === 0 ? (
            <div
              key={index}
              className="bg-dark-subtle contact-list-item"
              onClick={() => {
                setConversationID(conversation.conversation_id);
              }}>
              <div>{conversation.user1_username}</div>
            </div>
          ) : (
            <div
              key={index}
              className="bg-secondary-subtle contact-list-item"
              onClick={() => {
                setConversationID(conversation.conversation_id);
              }}>
              <div>{conversation.user1_username}</div>
            </div>
          )
        )}
    </div>
  );
}
