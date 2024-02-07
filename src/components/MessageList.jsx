import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getMessagesByConverationID } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function MessageList({
  conversationID,
  messageSent,
  conversations,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (conversationID) {
      getMessagesByConverationID(conversationID)
        .then(({ messages }) => {
          if (messages.length > 0) {
            setIsLoading(false);
            setMessages(messages);
          } else {
            setIsLoading(false);
          }
        })
        .catch(
          ({
            response: {
              status,
              data: { message },
            },
          }) => {
            setIsLoading(false);
            setError({ error });
          }
        );
    } else {
      setIsLoading(false);
    }
    setMessages([]);
  }, [conversationID, messageSent]);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading chat...</p>
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
      className="message-container p-4"
      style={{ overflowY: "auto" }}>
      {conversations.length !== 0 ? (
        <>
          <div className="d-flex justify-content-center">
            {!conversationID && (
              <div>Click on a contact to begin chatting.</div>
            )}
          </div>
          {messages.length > 0 ? (
            <div>
              {messages.map((message, index) => {
                return message.sender_id === user.userID ? (
                  <div
                    key={index}
                    className="d-flex justify-content-start">
                    <div className="bg-success text-white rounded p-2 mb-2 w-75">
                      <p style={{ fontSize: "12px" }}>{message.sender_name}</p>
                      <p>{message.message}</p>
                      <p style={{ fontSize: "12px", margin: "0px" }}>
                        {message.created_at}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="d-flex justify-content-end">
                    <div className="bg-success-subtle rounded p-2 mb-2 w-75">
                      <p style={{ fontSize: "12px" }}>{message.sender_name}</p>
                      <p>{message.message}</p>
                      <p style={{ fontSize: "12px", margin: "0px" }}>
                        {message.created_at}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      ) : (
        <div className="d-flex-col text-center">
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
