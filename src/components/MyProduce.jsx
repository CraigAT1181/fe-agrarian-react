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
    <div className="container">
      <div className="text-center p-3">
        <h5>What produce do you have available?</h5>
        <p>
          This will appear on your user card and allow other users to see what
          you have.
        </p>
        <div>
          <Dropdown
            className="mt-3"
            onSelect={(selectedItem) => handleProduceSelection(selectedItem)}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic">
              Add Produce
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                maxHeight: "11rem",
                overflowX: "auto",
                borderRadius: "10px",
              }}>
              {sortAllProduce().map((item) => (
                <Dropdown.Item
                  key={item}
                  eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <button
            onClick={() => updateUserProduceData([])}
            className="btn btn-outline-danger mt-1">
            Clear
          </button>
        </div>
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "auto" }}>
        <ItemCard
          allProduce={allProduce}
          userProduce={userProduce}
          removeProduceItem={removeProduceItem}
        />
      </div>
      <div style={{ height: "4rem" }}>
        {isLoading && (
          <div className="d-flex-col text-center mt-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading your produce selector...</p>
          </div>
        )}
        {userProduce.length === 0 && (
          <div className="d-flex justify-content-center">
            <Alert
              variant="danger"
              className="w-30">
              <div>You currently have no produce selected.</div>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
