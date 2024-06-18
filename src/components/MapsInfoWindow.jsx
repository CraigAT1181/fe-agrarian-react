import React from "react";
import MessageButtonL from "./MessageButtonL";
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
            <p key={produce} className="font-semibold mx-1">
              {produce}
            </p>
          );
        })}
      </div>
      <p>{selectedUser.postcode}</p>
      <div className="flex justify-center">
        {user && <MessageButtonL partner={selectedUser} />}
      </div>
    </div>
  );
}
