import React from "react";
import { useState, useEffect } from "react";
import { getProduce } from "../api/api";
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
    setError(null);
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
      setFilteredProduce([...filteredProduce, selectedItem]);
      setSelectedItem("");
    }
  }

  function handleUserSearch() {
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

  return (
    <section className="container">
      <div className="d-flex-col m-1 mt-2 mb-2 justify-content-center">
        <div className="row text-center">
          <h3>Find Local Growers</h3>
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
              {filteredProduce
                .filter((item, index, array) => array.indexOf(item) === index)
                .map((item, index) => (
                  <p
                    className="custom-outline-success"
                    style={{marginLeft: "1rem"}}
                    key={index}>
                    {item}
                  </p>
                ))}
            </Card.Body>
          </Card>
        </div>
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
          }}>
          Clear
        </button>
      </div>
    </section>
  );
}
