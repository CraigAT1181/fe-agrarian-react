import React from "react";
import MessageButton from "./MessageButton";
import { useAuth } from "./AuthContext";

export default function MapsInfoWindow({ selectedUser }) {
  const { user } = useAuth();

  return (
    <div className="info-window">
      <h5 className="">{selectedUser.username}</h5>
      <div className="info-window-produce">
        {selectedUser.produce.map((produce) => {
          return (
            <p
              key={produce}
              className="font-semibold mx-1">
              {produce}
            </p>
          );
        })}
      </div>
      <p>{selectedUser.postcode}</p>
      {user && selectedUser.user_id !== user.userID && (
        <div className="info-window-message-button">
          <MessageButton
            partner={selectedUser}
            size={"l"}
            colour={"green"}
          />
        </div>
      )}
    </div>
  );
}
