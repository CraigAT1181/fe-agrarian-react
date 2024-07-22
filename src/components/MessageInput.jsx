import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { sendMessage } from "../api/api";

export default function MessageInput({ conversationID }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setMessageSent } = useAuth();
  const [messageInput, setMessageInput] = useState("");

  function handleChange(e) {
    setMessageInput(e.target.value);
  }

  function handleSend(e) {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      setIsLoading(true);
      sendMessage(conversationID, user.userID, messageInput)
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Sending your message...</p>
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
    <div className="message-input mt-2">
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
            disabled={!conversationID}
          />
          <button
            id="message-button"
            className="btn btn-success"
            type="submit"
            disabled={!conversationID}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
