import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { sendMessage } from "../api/api";

export default function MessageInput({ conversationID, setMessageSent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");

  function handleChange(e) {
    setMessageInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      setIsLoading(true);
      sendMessage(conversationID, user.user_id, messageInput)
        .then(() => {
          setIsLoading(false);
          setMessageSent(true);
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
      setMessageInput("");
      setMessageSent(false);
    }
  }

  if (isLoading) return <p>Sending your message...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <div>
      <form onSubmit={handleSend}>
        <div className="input-group">
          <label
            htmlFor="message-input"
            className="form-label"></label>
          <input
            id="message-input"
            className="form-control"
            type="text"
            placeholder="Type your message here"
            value={messageInput}
            onChange={handleChange}
          />
          <button
            className="btn btn-success"
            type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
