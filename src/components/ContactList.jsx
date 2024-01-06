import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import "../App.css";

export default function ContactList({ conversations }) {
  const { user } = useAuth();

  return (
    <div>
      {conversations.map((conversation, index) =>
        conversation.user1_id === user.user_id ? (
          index % 2 === 0 ? (
            <div key={index} className="bg-success-subtle contact-list-item">
              {conversation.user2_username}
            </div>
          ) : (
            <div key={index} className="bg-secondary-subtle contact-list-item">
              {conversation.user2_username}
            </div>
          )
        ) : index % 2 === 0 ? (
          <div key={index} className="bg-success-subtle contact-list-item">
            {conversation.user1_username}
          </div>
        ) : (
          <div key={index} className="bg-secondary-subtle contact-list-item">
            {conversation.user1_username}
          </div>
        )
      )}
    </div>
  );
}
