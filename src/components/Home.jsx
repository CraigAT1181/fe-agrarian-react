import { useSSRSafeId } from "@react-aria/ssr";
import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Home() {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <section id="home">
      <div id="contact-list">
        <ContactList />
      </div>
      <div id="message-list">
        <MessageList messages={messages} />
      </div>
      <div id="message-input">
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
