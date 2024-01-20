import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Messenger() {
  const [conversationID, setConversationID] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  return (
    <section
      className="container-fluid"
      style={{ minHeight: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-4 h-100">
          <ContactList setConversationID={setConversationID} />
        </div>
        <div className="col-md-8 h-100">
          {conversationID && (
            <div>
              <MessageList
                conversationID={conversationID}
                messageSent={messageSent}
              />
            </div>
          )}
          {conversationID && (
            <div className="input-box-container h-25">
              <MessageInput
                conversationID={conversationID}
                setMessageSent={setMessageSent}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
