import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { deleteConversation, getConversationsByUserID } from "../api/api";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function ContactList({ setConversationID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [conversationDeleted, setConversationDeleted] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      getConversationsByUserID(user.user_id)
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

  const handleDeleteConversation = (conversationID) => {
    setIsLoading(true);
    deleteConversation(conversationID)
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

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <div className="d-flex-col row justify-content-center">
      {conversations.length > 0 ? (
        conversations.map((conversation, index) =>
          conversation.user1_id === user.user_id ? (
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
                    handleDeleteConversation(conversation.conversation_id);
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
                    handleDeleteConversation(conversation.conversation_id);
                  }}>
                  X
                </span>
              </div>
            </div>
          )
        )
      ) : (
        <div className="row g-3 text-center align-items-center w-50 p-3">
          <p>
            Looks like you've not begun a conversation yet. To view what people
            have posted, or find growers near you, click below.
          </p>

          <button
            onClick={() => navigate("/exchange")}
            className="btn btn-success mx-1 fw-bold">
            Exchange
          </button>
          <button
            onClick={() => navigate("/posts")}
            className="btn btn-success mx-1 fw-bold">
            Posts
          </button>
        </div>
      )}
    </div>
  );
}
