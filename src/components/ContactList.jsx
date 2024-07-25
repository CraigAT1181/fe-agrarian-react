import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { deleteConversation } from "../api/api";
import { useNavigate } from "react-router-dom";

const ContactList = React.memo(({ conversations, setConversations }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setSelectedConversation } = useAuth();
  const navigate = useNavigate();

  const handleDeleteConversation = (userID, conversationID) => {
    setIsLoading(true);

    // Optimistically update the UI
    setConversations((prevConversations) =>
      prevConversations.filter(
        (conv) => conv.conversation_id !== conversationID
      )
    );

    deleteConversation(userID, conversationID)
      .then(() => {
        setIsLoading(false);
        setSelectedConversation(null);
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
  };

  const handleConversationClick = (conversation, partner) => {
    setSelectedConversation(conversation);
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
      {conversations.length > 0 ? (
        conversations.map((conversation, index) => (
          <div
            key={conversation.conversation_id}
            className="border p-2 rounded-lg my-2 cursor-pointer"
            tabIndex={index === 0 ? 0 : -1}
            onClick={() =>
              handleConversationClick(
                conversation,
                conversation.user1_id === user.userID
                  ? conversation.user2_username
                  : conversation.user1_username
              )
            }
          >
            <div className="flex justify-between">
              <span className="font-semibold">
                {conversation.user1_id === user.userID
                  ? conversation.user2_username
                  : conversation.user1_username}
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
        ))
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
});

export default ContactList;
