import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { getConversationsByUserID } from "../api/api";

export default function Messenger() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

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
  }, [user]);

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  const handleSend = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <section
      className="container-fluid h-100"
      style={{ minHeight: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-4 h-100">
          {conversations.length > 0 && (
            <ContactList
              conversations={conversations}
              setMessages={setMessages}
            />
          )}
        </div>
        <div className="col-md-8 h-100">
          <div className="messages-container h-75 border-bottom">
            {messages.length === 0 && (
              <div>Click on a contact to continue your conversation.</div>
            )}
            {messages.length > 0 && <MessageList messages={messages} />}
          </div>
          <div className="input-box-container h-25">
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </section>
  );
}
