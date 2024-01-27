import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addConversationByUserID, getConversationsByUserID } from "../api/api";

export default function MessageButton({ partner }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    getConversationsByUserID(user.userID).then(({ conversations }) => {
      if (conversations.length > 0) {
        conversations.map((conversation) => {
          if (
            (user.userID === conversation.user1_id ||
              user.userID === conversation.user2_id) &&
            (partner === conversation.user1_id ||
              partner === conversation.user2_id)
          ) {
            navigate("/messenger");
          } else {
            addConversationByUserID(user.userID, partner).then((response) => {
              navigate("/messenger");
            });
          }
        });
      } else {
        addConversationByUserID(user.userID, partner).then((response) => {
          navigate("/messenger");
        });
      }
    });
  };

  return (
    <button
      className="btn btn-success mt-2"
      style={{ width: "8rem" }}
      onClick={handleClick}>
      Message
    </button>
  );
}
