import React from "react";
import { useState, useEffect } from "react";
import { getProduce, setUserProduce } from "../api/api";
import { Dropdown, Card, Alert } from "react-bootstrap";
import "../App.css";

export default function Home({ loggedUser }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [allProduce, setAllProduce] = useState([]);
  const [filteredUserProduce, setFilteredUserProduce] = useState([]);
  const [updatedUserProduce, setUpdatedUserProduce] = useState([]);
  const [produceUpdated, setProduceUpdated] = useState(false);

  const user_id = loggedUser.user_id;

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
      }, 3000); // Adjust the timeout duration as needed
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [updatedUserProduce]);

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

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

  return (
    <section className="container">
      {loggedUser.user_id > 0 ? (
        <div className="col text-center m-1 mt-2 mb-2 justify-content-center">
          <p>Your produce:</p>
          <Dropdown
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
            style={{ marginTop: "2rem", marginBottom: "1rem", border: "none" }}>
            <Card.Body className="d-flex flex-row justify-content-center">
              {filteredUserProduce
                .filter((item, index, array) => array.indexOf(item) === index)
                .map((item, index) => (
                  <p
                    className="custom-outline-success"
                    style={{ marginLeft: "1rem" }}
                    key={index}>
                    {item}
                  </p>
                ))}
            </Card.Body>
          </Card>
          <div>
            <button
              className="btn btn-success mt-2"
              style={{ width: "8rem" }}
              onClick={() =>
                handleConfirmProduce(user_id, filteredUserProduce)
              }>
              Confirm
            </button>
            <div
              className="mt-4"
              style={{ width: "400px" }}>
              {produceUpdated ? (
                <Alert
                  variant="success"
                  className="ml-2 fade-alert"
                  show={produceUpdated}>
                  Produce updated!
                </Alert>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3>Join the Agrarian Community</h3>
          <p className="m-4">
            Register using the button at the top to join a community <br />
            of people who want to connect, share and re-capture the independence
            and food-security of our ancestors!
          </p>
        </div>
      )}
    </section>
  );
}
