import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ItemCard({
  allProduce,
  userProduce,
  removeProduceItem,
}) {
  return (
    <ListGroup
      className="d-flex"
      style={{
        padding: "1rem",
        height: "auto",
        width: "75%",
        overflowX: "auto",
        display: "flex",
        flexDirection: "row",
        whiteSpace: "nowrap",
      }}>
      {allProduce
        .sort((a, b) => a.produce_name.localeCompare(b.produce_name))
        .map(
          (produceItem, index) =>
            userProduce.includes(produceItem.produce_name) && (
              <ListGroupItem
                className="text-success fw-bold p-3"
                style={{ marginLeft: "1rem", border: "solid 2px" }}
                key={index}>
                <div className="row justify-content-center">
                  <div
                    className="badge bg-danger-subtle"
                    title={`Remove ${produceItem.produce_name}`}
                    style={{ cursor: "pointer", width: "25px" }}
                    onClick={() => removeProduceItem(produceItem.produce_name)}>
                    X
                  </div>
                </div>
                <div className="row">
                  <div className="mt-2">{produceItem.produce_name}</div>
                </div>
              </ListGroupItem>
            )
        )}
    </ListGroup>
  );
}
