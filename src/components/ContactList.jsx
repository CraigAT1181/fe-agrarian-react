import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "../App.css";
import { getMessagesByConverationID } from "../api/api";

export default function ContactList({ setMessages, conversations }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleGetMessages = (conversation_id) => {
    setIsLoading(true);
    getMessagesByConverationID(conversation_id)
      .then(({ messages }) => {
        setIsLoading(false);
        setMessages(messages);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  };

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <div>
      {conversations.map((conversation, index) =>
        conversation.user1_id === user.user_id ? (
          index % 2 === 0 ? (
            <div
              key={index}
              className="bg-success-subtle contact-list-item"
              onClick={() => {
                handleGetMessages(conversation.conversation_id);
              }}>
              <div>{conversation.user2_username}</div>
            </div>
          ) : (
            <div
              key={index}
              className="bg-secondary-subtle contact-list-item"
              onClick={() => {
                handleGetMessages(conversation.conversation_id);
              }}>
              <div>{conversation.user2_username}</div>
            </div>
          )
        ) : index % 2 === 0 ? (
          <div
            key={index}
            className="bg-success-subtle contact-list-item"
            onClick={() => {
              handleGetMessages(conversation.conversation_id);
            }}>
            <div>{conversation.user1_username}</div>
          </div>
        ) : (
          <div
            key={index}
            className="bg-secondary-subtle contact-list-item"
            onClick={() => {
              handleGetMessages(conversation.conversation_id);
            }}>
            <div>{conversation.user1_username}</div>
          </div>
        )
      )}
    </div>
  );
}
