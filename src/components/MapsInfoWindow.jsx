import React from "react";
import MessageButtonS from "./MessageButtonS";
import { useAuth } from "./AuthContext";

export default function MapsInfoWindow({ selectedUser }) {
  const { user } = useAuth();
  console.log(selectedUser);
  return (
    <div className="info-window">
      <h5 className="">{selectedUser.username}</h5>
      <div className="info-window-produce">
        {selectedUser.produce.map((produce) => {
          return (
            <p key={produce} className="mr-2 font-semibold">
              {produce}
            </p>
          );
        })}
      </div>
      <div className="flex justify-start">
        {user && <MessageButtonS partner={selectedUser} />}
      </div>
    </div>
  );
}
