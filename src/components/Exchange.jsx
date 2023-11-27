import React, { useState, useEffect } from "react";
import Maps from "./Maps";
import MessageInterface from "./MessageInterface";
import ProduceFinder from "./ProduceFinder";
import { getUsersByProduceName } from "../api/api";
import UserCard from "./UserCard";

export default function Exchange() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [users, setUsers] = useState([]);

  function handleUserSearch () {
    getUsersByProduceName(filteredProduce)
    .then(({ users }) => {
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
  }

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <>
      <section className="d-flex">
        <div
          className="border border-success"
          style={{ width: "1fr" }}>
          <Maps />
          <section
      id="user-details"
      className="border border-primary"
      style={{ overflow: scroll}}>
      <UserCard users={users}/>
    </section>
        </div>
        <div
          className="border border-warning"
          style={{ width: "auto" }}>
          <ProduceFinder
            filteredProduce={filteredProduce}
            setFilteredProduce={setFilteredProduce}
          />
          <button onClick={handleUserSearch}>Search</button>
          <MessageInterface />
        </div>
      </section>
    </>
  );
}
