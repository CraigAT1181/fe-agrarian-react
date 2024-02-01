import React, { useState } from "react";
import Maps from "./Maps";
import ProduceFinder from "./ProduceFinder";
import UserPanel from "./UserPanel";

export default function Exchange() {
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <>
      <section className="container">
        <div className="row p-4">
          <ProduceFinder
            setUsers={setUsers}
            filteredProduce={filteredProduce}
            setFilteredProduce={setFilteredProduce}
          />
        </div>
        <div className="row box-border p-4 mt-4">
          <div className="col-md-6">
            <Maps users={users} />
          </div>

          <div className="col-md-6">
            <UserPanel
              setUsers={setUsers}
              users={users}
            />
          </div>
        </div>
      </section>
    </>
  );
}
