import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ItemCard({ filteredUserProduce }) {
  return (
    <Card style={{ border: "none" }}>
      <Card.Body
        className="d-flex justify-content-center"
        style={{ height: "auto" }}>
        <ListGroup
          style={{
            marginTop: "1rem",
            maxHeight: "40%",
            width: "50%",
            overflowX: "auto",
            display: "flex",
            flexDirection: "row",
          }}>
          {filteredUserProduce
            .filter((item, index, array) => array.indexOf(item) === index)
            .map((item, index) => (
              <ListGroupItem
                className="my-produce-list p-1"
                style={{ marginLeft: "1rem", height: "auto" }}
                key={index}>
                <div className="position-absolute top-0 end-0">
                  {" "}
                  <span
                    className="badge bg-success"
                    style={{ cursor: "pointer" }}
                    onClick={() => {}}>
                    X
                  </span>
                </div>

                {item}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
