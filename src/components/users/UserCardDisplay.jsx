import React from "react";
import UserCard from "./UserCard";

export default function UserCardDisplay({ users }) {
  return (
    <div className="grid">
      {users &&
        users.map((user) => {
          return (
            <UserCard
              key={user.user_id}
              user={user}
            />
          );
        })}
    </div>
  );
}
