import React, { useState, useEffect } from "react";
import Maps from "./Maps";
import UserDetails from "./UserDetails";
import MessageInterface from "./MessageInterface";
import ProduceFinder from "./ProduceFinder";

export default function Exchange() {
  const [filteredProduce, setFilteredProduce] = useState([]);

  return (
    <>
      <section className="d-flex">
        <div
          className="border border-success"
          style={{ width: "1fr" }}>
          <Maps />
          <UserDetails />
        </div>
        <div
          className="border border-warning"
          style={{ width: "auto" }}>
          <ProduceFinder
            filteredProduce={filteredProduce}
            setFilteredProduce={setFilteredProduce}
          />
          <button>Search</button>
          <MessageInterface />
        </div>
      </section>
    </>
  );
}
