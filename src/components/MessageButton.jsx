import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addConversationByUserID, getConversationsByUserID } from "../api/api";

export default function MessageButton({ partner }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { conversations } = await getConversationsByUserID(user.userID);

      const conversationExists = conversations.some(
        (conversation) =>
          (user.userID === conversation.user1_id ||
            user.userID === conversation.user2_id) &&
          (partner === conversation.user1_id ||
            partner === conversation.user2_id)
      );

      if (conversationExists) {
        navigate("/messenger");
      } else {
        await addConversationByUserID(user.userID, partner);
        navigate("/messenger");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message || "An error occurred");
    }
  };

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Handling conversations...</p>
      </div>
    );

  return (
    <button
      className="btn btn-success mt-2"
      style={{ width: "8rem" }}
      onClick={handleClick}
      disabled={isLoading}>
      Message
    </button>
  );
}
