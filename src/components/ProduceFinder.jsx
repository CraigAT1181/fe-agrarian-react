import React from "react";
import { useState, useEffect } from "react";
import { getProduce, getUsers } from "../api/api";
import { getUsersByProduceName } from "../api/api";
import { Dropdown, Card, Button, Alert } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../App.css";

export default function ProduceFinder({
  setUsers,
  filteredProduce,
  setFilteredProduce,
}) {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [allProduce, setAllProduce] = useState([]);
  const [notAvailable, setNotAvailable] = useState(null);

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

  function sortAllProduce() {
    const produceNames = allProduce.map((item) => {
      return item.produce_name;
    });

    const sortedProduce = produceNames.sort();

    return sortedProduce;
  }

  function handleProduceSelection(selectedItem) {
    if (selectedItem) {
      setFilteredProduce([...filteredProduce, selectedItem]);
      setSelectedItem("");
    }
  }

  function handleUserSearch() {
    if (filteredProduce.length !== 0) {
      getUsersByProduceName(filteredProduce)
        .then((data) => {
          if (data.message) {
            setNotAvailable(data.message);
          } else {
            setUsers(data.users);
          }
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading Local Grower Search...</p>
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
      className="container p-3 mt-5 text-center justify-content-center"
      style={{ boxShadow: "0 0 10px 0 #ccc", borderRadius: "25px" }}>
      <h5>Looking for something specific?</h5>

      <div className="mb-2 pt-1">
        <Dropdown
          onSelect={(selectedItem) => {
            handleProduceSelection(selectedItem);
            setNotAvailable(null);
          }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic">
            Select Produce
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
      </div>

      <div
        className="d-flex flex-row align-items-center"
        style={{ overflowX: "auto", height: "5rem" }}>
        {notAvailable ? (
          <div className="col justify-content-center">
            <Alert variant="danger">
              <div>{notAvailable}</div>
            </Alert>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <ListGroup
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              {filteredProduce
                .filter((item, index, array) => array.indexOf(item) === index)
                .map((item, index) => (
                  <ListGroupItem
                    key={index}
                    style={{
                      whiteSpace: "nowrap",
                      marginRight: "0.4rem",
                      border: "1px solid #28a745",
                      color: "#28a745",
                    }}>
                    {item}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </div>
        )}
      </div>

      <div className="d-flex m-1 mt-2 mb-2 justify-content-center">
        <Button
          variant="success mx-2"
          onClick={handleUserSearch}>
          Search
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            setFilteredProduce([]);
            setNotAvailable(null);
            getUsers().then(({ users }) => {
              setUsers(users);
            });
          }}>
          Clear
        </Button>
      </div>
    </section>
  );
}
