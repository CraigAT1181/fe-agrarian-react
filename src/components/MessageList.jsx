import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getMessagesByConverationID } from "../api/api";

export default function MessageList({ conversationID, messageSent }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    if (conversationID) {
      getMessagesByConverationID(conversationID)
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
    } else {
      setIsLoading(false);
    }
  }, [conversationID, messageSent]);

  if (isLoading) return <p>Gathering your messages...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <div>
      <div className="message-container h-75">
        {messages.length > 0 ? (
          <>
            <div>
              {messages.map((message, index) => {
                return message.sender_id === user.user_id ? (
                  <div
                    key={index}
                    className="d-flex justify-content-start">
                    <div className="bg-success-subtle rounded p-2 mb-2 w-75">
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
          </>
        ) : (
          <div>Click on a contact to continue your conversation.</div>
        )}
      </div>
    </div>
  );
}
