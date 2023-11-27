import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import UserDetails from "./UserDetails";
import MessageInterface from "./MessageInterface";
import ProduceSearch from "./ProduceSearch";
import { getProduce } from "../api/api";

export default function Exchange() {
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

  return (
    <>
      <section className="d-flex">
        <div
          className="border border-success"
          style={{ width: "1fr" }}>
          <Maps />
          <UserDetails style={{ height: "auto" }} />
        </div>
        <div
          className="border border-warning"
          style={{ width: "auto" }}>
          <ProduceSearch
            allProduce = {allProduce}
          />
          <MessageInterface />
        </div>
      </section>
    </>
  );
}
