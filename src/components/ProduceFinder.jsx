import React from "react";
import { useState, useEffect } from "react";
import { getProduce, getUsers } from "../api/api";
import { getUsersByProduceName } from "../api/api";
import { Dropdown, Card } from "react-bootstrap";
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
        <i class="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <section className="container justify-content-center">
      <div className="text-start">
        <h3>Find Local Growers</h3>
      </div>
      <div className="mb-2">
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
      </div>
      <div
        className="d-flex"
        style={{ minHeight: "4.3rem", overflowX: "auto" }}>
        <Card
          className="rounded"
          style={{ border: "none" }}>
          <Card.Body className="d-flex flex-row justify-content-center">
            {filteredProduce
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
      </div>

      <div className="d-flex m-1 mt-2 mb-2 justify-content-center">
        <button
          className="btn btn-success mt-2"
          style={{ width: "8rem" }}
          onClick={handleUserSearch}>
          Search
        </button>
        <button
          className="btn btn-outline-success mt-2"
          style={{ width: "8rem", marginLeft: "2rem" }}
          onClick={() => {
            setFilteredProduce([]);
            getUsers().then(({ users }) => {
              setUsers(users);
            });
          }}>
          Clear
        </button>
      </div>

      <div className="d-flex-col m-1 mt-2 mb-2 justify-content-center">
        <div className="row text-center"></div>
      </div>
    </section>
  );
}
