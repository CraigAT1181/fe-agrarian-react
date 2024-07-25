import React, { useEffect, useState, useCallback } from "react";
import MessengerSearchBar from "./MessengerSearchBar";
import ContactList from "./ContactList";
import { getConversationsByUserID } from "../api/api";
import { useAuth } from "./AuthContext";

export default function Messenger() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();

  const fetchConversations = useCallback(() => {
    if (!user) return;

    setIsLoading(true);
    getConversationsByUserID(user.userID)
      .then(({ conversations }) => {
        setConversations(conversations);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message });
        }
      );
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (isLoading)
    return (
      <div className="flex text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
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
    <div className="messenger-container">
      <MessengerSearchBar
        conversations={conversations}
        fetchConversations={fetchConversations}
      />
      <ContactList
        conversations={conversations}
        setConversations={setConversations}
      />
    </div>
  );
}
