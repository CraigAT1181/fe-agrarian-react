import React, { useState, useEffect } from "react";
import { getUsers } from "../api/api";
import UserCard from "./UserCard";

export default function UserPanel({ users, setUsers }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getUsers()
      .then(({ users }) => {
        setIsLoading(false);
        setUsers(users);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  }, []);

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <section
      className="container d-flex justify-content-center"
      >
      <div
        className="row"
        style={{ height: "400px", overflowY: "auto" }}>
        <div className="col-md-6">
          <UserCard users={users} />
        </div>
      </div>
    </section>
  );
}
