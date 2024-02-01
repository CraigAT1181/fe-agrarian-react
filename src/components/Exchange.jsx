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
        <div className="row">
        <div className="col-md-6">
          <div>
            <Maps users={users} />
          </div>

          <div>
            <ProduceFinder
              setUsers={setUsers}
              filteredProduce={filteredProduce}
              setFilteredProduce={setFilteredProduce}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div>
            <UserPanel
              setUsers={setUsers}
              users={users}
            />
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
