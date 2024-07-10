import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { deleteConversation, getConversationsByUserID } from "../api/api";

export default function ContactList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fetchedConversations, setFetchedConversations] = useState([]);
  const [selectedConversationID, setSelectedConversationID] = useState(null);

  const [conversationDeleted, setConversationDeleted] = useState(false);
  const { user } = useAuth();
  const topItemRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      fetchConversations();
    } else {
      setIsLoading(false);
    }

    setConversationDeleted(false);
  }, [user, conversationDeleted]);

  useEffect(() => {
    if (fetchedConversations.length > 0 && topItemRef.current) {
      topItemRef.current.focus();
      setSelectedConversationID(fetchedConversations[0].conversation_id);
    }
  }, [fetchedConversations]);

  const fetchConversations = () => {
    setIsLoading(true);
    getConversationsByUserID(user.userID)
      .then(({ conversations }) => {
        setIsLoading(false);
        setFetchedConversations(conversations);
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
  };

  const handleDeleteConversation = (userID, conversationID) => {
    setIsLoading(true);
    deleteConversation(userID, conversationID)
      .then(() => {
        setIsLoading(false);
        setSelectedConversationID(null);
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

  const handleConversationClick = (conversationID) => {
    setSelectedConversationID(conversationID);
    console.log("click");
  };

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
    <div>
      {fetchedConversations.length > 0
        ? fetchedConversations.map((conversation, index) =>
            conversation.user1_id === user.userID ? (
              <div
                key={index}
                className="border p-2 rounded-lg my-2 cursor-pointer"
                ref={index === 0 ? topItemRef : null}
                tabIndex={index === 0 ? 0 : -1}
                onClick={() => {
                  handleConversationClick(conversation.conversation_id);
                }}>
                <div className="flex justify-between">
                  <span className="font-semibold">{conversation.user2_username}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleDeleteConversation(
                        user.userID,
                        conversation.conversation_id
                      );
                    }}>
                    <i className="fa-solid text-green-900 fa-square-xmark"></i>
                  </span>
                </div>
                <div className="text-sm text-center">
                  <span>Message is going to appear here...</span>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className=""
                ref={index === 0 ? topItemRef : null}
                tabIndex={index === 0 ? 0 : -1}
                onClick={() => {
                  setConversationID(conversation.conversation_id);
                }}>
                <div
                  className=""
                  onClick={() => {
                    setConversationID(conversation.conversation_id);
                  }}>
                  {conversation.user1_username}
                </div>
                <div className="absolute">
                  <span
                    className=""
                    onClick={() => {
                      handleDeleteConversation(
                        user.userID,
                        conversation.conversation_id
                      );
                    }}>
                    X
                  </span>
                </div>
              </div>
            )
          )
        : null}
    </div>
  );
}
