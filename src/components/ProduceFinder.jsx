import React from "react";
import { useState, useEffect } from "react";
import { getProduce } from "../api/api";

export default function ProduceFinder({ filteredProduce, setFilteredProduce }) {
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

  return (
    <section className="flex-column justify-content-center border border-primary">
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
      <div>
        {filteredProduce.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    </section>
  );
}
