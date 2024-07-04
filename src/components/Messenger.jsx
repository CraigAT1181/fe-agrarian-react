import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useAuth } from "./AuthContext";

export default function Messenger() {
  const [conversationID, setConversationID] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  const { user } = useAuth();

  return (
    <div>
      {user && (
        <div className="">
          <div className="">
            <ContactList
              conversations={conversations}
              setConversations={setConversations}
              setConversationID={setConversationID}
            />
          </div>

          <div className="">
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
      )}
    </div>
  );
}
