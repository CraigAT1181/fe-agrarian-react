import React, { useState, useEffect } from "react";
import { getProduce, getUsersByProduceName } from "../api/api";

export default function ProduceFinder({
  setUsers,
  filteredProduce,
  setFilteredProduce,
}) {
  const [allProduce, setAllProduce] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [clicked, setClicked] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    // Populate produce dropdown list on render
    getProduce()
      .then(({ produce }) => {
        setIsLoading(false);
        setAllProduce(produce);
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

  // Sort dropdown list into alphabetical order
  function sortAllProduce() {
    const produceNames = allProduce.map((item) => item.produce_name);
    return produceNames.sort();
  }

  // Handle visibility of dropdown list
  const handleClicked = () => {
    setClicked(!clicked);
  };

  // Handle produce selection in the dropdown list
  function handleProduceSelection(item) {
    if (!filteredProduce.includes(item)) {
      setFilteredProduce([...filteredProduce, item]);
    } else {
      setFilteredProduce(filteredProduce.filter((produce) => produce !== item));
    }
  }

  // Ensure a user search is carried out whenever the state of filteredProduce changes
  useEffect(() => {
    handleUserSearch();
  }, [filteredProduce]);

  // When there are any items in filteredProduce, make an API request for all users who have that item
  function handleUserSearch() {
    setIsLoading(true);
    if (filteredProduce.length !== 0) {
      getUsersByProduceName(filteredProduce)
        .then(({ users }) => {
          setUsers(users);
          setFilteredUsers(users);
          setIsLoading(false);
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
    } else {
      setUsers([]);
      setFilteredUsers([]);
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-col text-center">
        <div className="mt-4">
          <span className="font-semibold text-green-950">
            Looking for anything in particular?
          </span>
        </div>
        <button
          className="dropdown"
          onClick={handleClicked}
          aria-haspopup="true"
          aria-expanded={clicked}>
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Select"
          )}
        </button>

        {clicked && (
          <div className="menu">
            {sortAllProduce().map((item) => {
              // Check if item is in filteredProduce
              const isInFilteredProduce = filteredProduce.includes(item);
              // Check if item is in any user's produce list in filteredUsers
              const isItemInUsersProduce =
                Array.isArray(filteredUsers) &&
                filteredUsers.some((user) => user.produce.includes(item));

              // Determine className based on conditions
              let className = "menu-item-unclicked";
              if (isInFilteredProduce) {
                className = isItemInUsersProduce
                  ? "menu-item-clicked"
                  : "menu-item-clicked-not-found";
              }

              return (
                <button
                  key={item}
                  className={className}
                  onClick={() => {
                    handleProduceSelection(item);
                  }}>
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
