import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addConversationByUserID, getConversationsByUserID } from "../api/api";

export default function MessageButton({ partner, size, colour }) {
  console.log(partner, size, colour);
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
          (partner.user_id === conversation.user1_id ||
            partner.user_id === conversation.user2_id)
      );

      if (conversationExists) {
        navigate("/messenger");
      } else {
        setIsLoading(true);
        await addConversationByUserID(user.userID, partner.user_id);
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
    <div>
      {size === "l" ? (
        colour === "green" ? (
          <button
            className="text-white"
            style={{ margin: "0" }}
            title="Send Message"
            onClick={handleClick}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-2x text-green-900 fa-envelope"></i>
            )}
          </button>
        ) : (
          <button
            className="text-white"
            style={{ margin: "0" }}
            title="Send Message"
            onClick={handleClick}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-2x text-white fa-envelope"></i>
            )}
          </button>
        )
      ) : colour === "green" ? (
        <button
          className="text-white"
          style={{ margin: "0" }}
          title="Send Message"
          onClick={handleClick}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid text-green-900 fa-envelope"></i>
          )}
        </button>
      ) : (
        <button
          className="text-white"
          style={{ margin: "0" }}
          title="Send Message"
          onClick={handleClick}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid text-white fa-envelope"></i>
          )}
        </button>
      )}
    </div>
  );
}
