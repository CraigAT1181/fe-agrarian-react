import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import "../App.css";

export default function Messenger() {
  const [conversationID, setConversationID] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  return (
    <section className="container">
      <div className="row messenger-panel">
        <div className="col-md-4 h-100">
          <ContactList
            conversations={conversations}
            setConversations={setConversations}
            setConversationID={setConversationID}
          />
        </div>

        <div className="col-md-8">
          <div>
            <MessageList
              conversationID={conversationID}
              messageSent={messageSent}
              conversations={conversations}
            />
          </div>

          <div>
            <MessageInput
              conversationID={conversationID}
              setMessageSent={setMessageSent}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
