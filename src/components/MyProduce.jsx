import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getProduce, setUserProduce } from "../api/api";
import { Dropdown, Card, Alert } from "react-bootstrap";
import "../App.css";

export default function MyProduce() {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [allProduce, setAllProduce] = useState([]);
  const [filteredUserProduce, setFilteredUserProduce] = useState([]);
  const [updatedUserProduce, setUpdatedUserProduce] = useState([]);
  const [produceUpdated, setProduceUpdated] = useState(false);

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
    let timeout;

    if (produceUpdated) {
      timeout = setTimeout(() => {
        setProduceUpdated(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [updatedUserProduce]);

  function sortAllProduce() {
    const produceNames = allProduce.map((item) => {
      return item.produce_name;
    });

    const sortedProduce = produceNames.sort();

    return sortedProduce;
  }

  function handleProduceSelection(selectedItem) {
    if (selectedItem) {
      setFilteredUserProduce([...filteredUserProduce, selectedItem]);
      setSelectedItem("");
    }
  }

  function handleConfirmProduce(user_id, filteredUserProduce) {
    setUserProduce(user_id, filteredUserProduce)
      .then((data) => {
        setProduceUpdated(true);
        setUpdatedUserProduce(data.produce);
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
    <section className="container box-border">
      <div className="text-center m-1 mt-2 mb-2 justify-content-center">
        <h5>What produce do you have available?</h5>
        <Dropdown
          className="mt-3"
          onSelect={(selectedItem) => handleProduceSelection(selectedItem)}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic">
            Select Produce
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {sortAllProduce().map((item) => (
              <Dropdown.Item
                key={item}
                eventKey={item}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Card
          className="rounded"
          style={{ marginTop: "1rem", border: "none" }}>
          <Card.Body className="d-flex flex-row justify-content-center">
            {produceUpdated
              ? null
              : filteredUserProduce
                  .filter((item, index, array) => array.indexOf(item) === index)
                  .map((item, index) => (
                    <p
                      className="custom-outline-success"
                      style={{ marginLeft: "1rem" }}
                      key={index}>
                      {item}
                    </p>
                  ))}
            {produceUpdated ? (
              <Alert
                variant="success"
                className="ml-2 fade-alert"
                show={produceUpdated}>
                Produce updated!
              </Alert>
            ) : null}
          </Card.Body>
        </Card>
        <div className="d-flex-col justify-content-center mt-4">
          <button
            className="btn btn-success mx-2"
            style={{ width: "8rem" }}
            onClick={() =>
              handleConfirmProduce(user.user_id, filteredUserProduce)
            }>
            Confirm
          </button>
          <button
            onClick={() => setFilteredUserProduce([])}
            className="btn btn-outline-danger">
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
