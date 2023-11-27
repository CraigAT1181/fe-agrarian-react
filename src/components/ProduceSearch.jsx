import { all } from "axios";
import React from "react";

export default function ProduceSearch({ allProduce }) {
  const produceNames = allProduce.map((item) => {
    return item.produce_name;
  });

  const sortedProduce = produceNames.sort();

  return (
    <>
      <section className=".flex-column justify-content-center border border-primary">
        <p>Find Local Growers</p>

        <select
          name=""
          id="">
          <option value="Select">Select Produce</option>

          {sortedProduce.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <div id="selected-produce-list">
          <p>Selected produce will appear here</p>
        </div>
        <button>Search</button>
      </section>
    </>
  );
}
