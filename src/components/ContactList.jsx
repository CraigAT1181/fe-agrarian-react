import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { deleteConversation, getConversationsByUserID } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fetchedConversations, setFetchedConversations] = useState([]);

  const [conversationDeleted, setConversationDeleted] = useState(false);
  const { user, setSelectedConversation } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchConversations();
    } else {
      setIsLoading(false);
    }

    setConversationDeleted(false);
  }, [user, conversationDeleted]);

  const fetchConversations = () => {
    setIsLoading(true);
    getConversationsByUserID(user.userID)
      .then(({ conversations }) => {
        setFetchedConversations(conversations);
        setIsLoading(false);
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
        setSelectedConversation(null);
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

  const handleConversationClick = (conversation, partner) => {
    setSelectedConversation(conversation);
    console.log(conversation);
    navigate(`/messenger/${partner}/${conversation.conversation_id}`);
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
      {fetchedConversations.length > 0 ? (
        fetchedConversations.map((conversation, index) =>
          conversation.user1_id === user.userID ? (
            <div
              key={index}
              className="border p-2 rounded-lg my-2 cursor-pointer"
              tabIndex={index === 0 ? 0 : -1}
              onClick={() => {
                handleConversationClick(
                  conversation,
                  conversation.user2_username
                );
              }}
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {conversation.user2_username}
                </span>
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(
                      user.userID,
                      conversation.conversation_id
                    );
                  }}
                >
                  <i className="fa-solid text-green-900 fa-square-xmark"></i>
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <span>Click to view messages</span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="border p-2 rounded-lg my-2 cursor-pointer"
              tabIndex={index === 0 ? 0 : -1}
              onClick={() => {
                handleConversationClick(
                  conversation,
                  conversation.user1_username
                );
              }}
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  {conversation.user1_username}
                </span>
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(
                      user.userID,
                      conversation.conversation_id
                    );
                  }}
                >
                  <i className="fa-solid text-green-900 fa-square-xmark"></i>
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <span>Click to view messages</span>
              </div>
            </div>
          )
        )
      ) : (
        <div className="flex justify-center mt-4">
          <p className="text-center">
            No conversations found. Try searching for someone above, or browsing
            posts, blogs or activities.
          </p>
        </div>
      )}
    </div>
  );
}
