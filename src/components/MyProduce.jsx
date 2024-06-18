import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getProduce } from "../api/api";
import { Alert, Dropdown } from "react-bootstrap";
import "../App.css";
import ItemCard from "./ItemCard";

export default function MyProduce() {
  const { user, updateUserProduceData } = useAuth();
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [allProduce, setAllProduce] = useState([]);
  const [userProduce, setUserProduce] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

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

  useEffect(() => {
    if (user) {
      setUserProduce(user.produce);
    }
  }, [user]);

  function sortAllProduce() {
    const produceNames = allProduce.map((item) => {
      return item.produce_name;
    });

    const sortedProduce = produceNames.sort();

    return sortedProduce;
  }

  function handleProduceSelection(selectedItem) {
    if (selectedItem) {
      setIsLoading(true);
      updateUserProduceData(selectedItem)
        .then(() => {
          setIsLoading(false);
          setSelectedItem("");
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
  }

  const removeProduceItem = async (itemNameToRemove) => {
    setIsLoading(true);
    const newProduce = userProduce.filter((item) => item !== itemNameToRemove);
    try {
      await updateUserProduceData(newProduce);
      setUserProduce(newProduce);
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle visibility of dropdown list
  const handleClicked = () => {
    setClicked(!clicked);
  };

  const handleItemClick = (item) => {
    if (user.produce.includes(item)) {
      removeProduceItem(item);
    } else {
      handleProduceSelection(item);
    }
  };

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
    <div className="flex-col text-center my-4">
      <div>
        <p>What produce do you have available?</p>
      </div>
      <button
        className="dropdown"
        onClick={handleClicked}
        aria-haspopup="true"
        aria-expanded={clicked}>
        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Select"}
      </button>

      {clicked && (
        <div className="menu">
          {sortAllProduce().map((item) => {
            // Check if item is in userProduce
            const isInUserProduce = userProduce.includes(item);

            // Determine className based on whether it's in userProduce
            let className = "menu-item-unclicked";
            if (isInUserProduce) {
              className = "menu-item-clicked";
            }

            return (
              <button
                key={item}
                className={className}
                onClick={() => {
                  handleItemClick(item);
                }}>
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
