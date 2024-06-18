import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addConversationByUserID, getConversationsByUserID } from "../api/api";

export default function MessageButtonS({ partner }) {
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
        setIsLoading(true);
        await addConversationByUserID(user.userID, partner);
        setIsLoading(false);
        navigate("/messenger");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message || "An error occurred");
    }
  };

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
    <button
      className="text-green-950"
      style={{ marginLeft: "1em", padding: "0" }}
      title="Send Message"
      onClick={handleClick}>
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <i className="fa-solid fa-envelope"></i>
      )}
    </button>
  );
}
