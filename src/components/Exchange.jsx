import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import ProduceFinder from "./ProduceFinder";
import { getUsers } from "../api/api";

export default function Exchange() {
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filteredProduce.length === 0) {
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
    }
  }, [filteredProduce]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <div className="flex-col text-center">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="grid">
      <div>
        <Maps users={users} />
      </div>

      <div>
        <ProduceFinder
          setUsers={setUsers}
          filteredProduce={filteredProduce}
          setFilteredProduce={setFilteredProduce}
        />
      </div>
    </div>
  );
}
