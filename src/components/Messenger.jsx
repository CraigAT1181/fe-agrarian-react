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
          console.log(conversations);
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
    <section className="container">
      <div className="row">
        <div className="col">
          {conversations.length > 0 && (
            <ContactList conversations={conversations} />
          )}
        </div>
        <div className="col-6">
          <div>
            <MessageList messages={messages} />
          </div>
          <div>
            <MessageInput onSend={handleSend} />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </section>
  );
}
