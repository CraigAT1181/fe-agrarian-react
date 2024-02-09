import React, { useState, useEffect } from "react";
import { getUsers } from "../api/api";
import UserCard from "./UserCard";
import { Alert } from "react-bootstrap";

export default function UserPanel({ users, setUsers }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noUsers, setNoUsers] = useState(false);

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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading user list...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <section
      className="container p-3 justify-content-center"
      style={{ height: "75vh", overflowY: "auto" }}>
      {users.length === 0 ? (
        <div className="d-flex justify-content-center">
          <Alert
            variant="success"
            className="text-center w-50">
            <div>No users found for now, but check back later!</div>
          </Alert>
        </div>
      ) : (
        <div>
          <UserCard users={users} />
        </div>
      )}
    </section>
  );
}
