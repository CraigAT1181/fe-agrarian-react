import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSend() {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  }

  return (
    <div>
      <input type="text" value={message} onChange={handleChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
