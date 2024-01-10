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
  const [conversations, setConversations] = useState([]);
  const [conversationID, setConversationID] = useState();
  const [messageSent, setMessageSent] = useState(false);

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

  return (
    <section
      className="container-fluid"
      style={{ minHeight: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-4 h-100">
          <ContactList
            conversations={conversations}
            setConversationID={setConversationID}
          />
        </div>
        <div className="col-md-8 h-100">
          {conversations.length > 0 ? (
            <div>
              <MessageList conversationID={conversationID} messageSent={messageSent} />
            </div>
          ) : (
            <div>You've not contacted anyone yet.</div>
          )}
          <div className="input-box-container h-25">
            <MessageInput conversationID={conversationID} setMessageSent={setMessageSent}/>
          </div>
        </div>
      </div>
    </section>
  );
}
