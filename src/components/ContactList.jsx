import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { deleteConversation, getConversationsByUserID } from "../api/api";
import "../App.css";


export default function ContactList({ conversations, setConversations, setConversationID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversationDeleted, setConversationDeleted] = useState(false);
  const { user } = useAuth();

 

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      getConversationsByUserID(user.userID)
        .then(({ conversations }) => {
          setIsLoading(false);
          setConversations(conversations);
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
    } else {
      setIsLoading(false);
    }

    setConversationDeleted(false);
  }, [user, conversationDeleted]);

  const handleDeleteConversation = (userID, conversationID) => {
    setIsLoading(true);
    deleteConversation(userID, conversationID)
      .then(() => {
        setIsLoading(false);
        setConversationID(null);
        setConversationDeleted(true);
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading conversations...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div
      className="d-flex-col justify-content-center"
      style={{ overflowY: "auto" }}>
      {conversations.length > 0 ? (
        conversations.map((conversation, index) =>
          conversation.user1_id === user.userID ? (
            <div
              key={index}
              className="contact-list-item rounded text-success">
              <div
                className="contact-list-name"
                onClick={() => {
                  setConversationID(conversation.conversation_id);
                }}>
                {conversation.user2_username}
              </div>
              <div className="position-absolute top-0 end-0 m-1 ">
                <span
                  className="badge bg-success-subtle"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDeleteConversation(user.userID, conversation.conversation_id);
                  }}>
                  X
                </span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="contact-list-item rounded text-success">
              <div
                className="contact-list-name"
                onClick={() => {
                  setConversationID(conversation.conversation_id);
                }}>
                {conversation.user1_username}
              </div>
              <div className="position-absolute top-0 end-0 m-1 ">
                <span
                  className="badge bg-success-subtle"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDeleteConversation(user.userID, conversation.conversation_id);
                  }}>
                  X
                </span>
              </div>
            </div>
          )
        )
      ) : (
        null
      )}
    </div>
  );
}
