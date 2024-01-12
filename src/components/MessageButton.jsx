import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getConversationsByUserID } from "../api/api";

export default function MessageButton({ partner }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    getConversationsByUserID(user.user_id).then(({ conversations }) => {
      conversations.map((conversation) => {
        console.log(conversation);
        console.log(partner);
        if (
          (user.user_id === conversation.user1_id || conversation.user2_id) &&
          (partner === conversation.user1_id || conversation.user2_id)
        ) {
          console.log("true");
        }
      });
    });
  };

  // Add a new conversation

  // If conversation exists, load messages for that conversation

  return (
    <button
      className="btn btn-success mt-2"
      style={{ width: "8rem" }}
      onClick={handleClick}
    >
      Message
    </button>
  );
}
