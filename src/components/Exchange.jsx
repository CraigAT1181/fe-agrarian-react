import React, { useState } from "react";
import Maps from "./Maps";
import MessageInterface from "./MessageInterface";
import ProduceFinder from "./ProduceFinder";
import UserPanel from "./UserPanel";

export default function Exchange() {
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col-md-6">
            <Maps users={users}/>
          </div>
          <div className="col-md-6 mt-5 pt-4">
            <ProduceFinder
              setUsers={setUsers}
              filteredProduce={filteredProduce}
              setFilteredProduce={setFilteredProduce}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UserPanel
              setUsers={setUsers}
              users={users}
            />
          </div>
          <div className="col-md-6">
            <MessageInterface />
          </div>
        </div>
      </section>
    </>
  );
}
