import React from "react";
import { useState, useEffect } from "react";
import { getProduce } from "../api/api";
import { getUsersByProduceName } from "../api/api";

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

  function handleProduceSelection(e) {
    const selectedItem = e.target.value;
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
        <p>Find Local Growers</p>
        <form>
          <select
            id="produce-select"
            onChange={handleProduceSelection}>
            <option
              value=""
              hidden>
              Select Produce
            </option>
            {sortAllProduce().map((item) => (
              <option
                key={item}
                value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="d-flex m-1 mt-2 mb-2 justify-content-center">
        
          {filteredProduce.map((item, index) => {
            return (
              <p
                className="p-1 m-2 border"
                key={index}>
                {item}
              </p>
            );
          })}
        

        <button
          className="btn btn-success mt-2"
          style={{ width: "8rem" }}
          onClick={handleUserSearch}>
          Search
        </button>
      </div>
    </section>
  );
}
