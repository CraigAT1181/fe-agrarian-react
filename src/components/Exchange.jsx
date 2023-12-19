import React, { useState } from "react";
import Maps from "./Maps";
import ProduceFinder from "./ProduceFinder";
import UserPanel from "./UserPanel";

export default function Exchange() {
  const [filteredProduce, setFilteredProduce] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <>
    <div className="post-header">
    <div className="d-flex flex-column align-items-center p-3">
            <ProduceFinder
              setUsers={setUsers}
              filteredProduce={filteredProduce}
              setFilteredProduce={setFilteredProduce}
            />
          </div>
      </div>
      <section className="container">
        <div className="row">
          <div className="col-md-6">
            <Maps users={users} />
          </div>

          <div className="col-md-6">
            <UserPanel setUsers={setUsers} users={users} />
          </div>
        </div>
      </section>
    </>
  );
}
