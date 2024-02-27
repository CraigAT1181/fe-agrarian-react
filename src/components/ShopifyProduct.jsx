import React from "react";
import { Alert } from "react-bootstrap";

export default function ShopifyProduct({ title, image }) {
  return (
    <div className="container h-100 p-4 box-border">
      {image ? (
        <div className="d-flex justify-content-center">
          <img
            src={image}
            alt=""
            style={{ height: "250px" }}
          />
        </div>
      ) : (
        <div
          style={{
            height: "250px",
            textAlign: "center",
          }}>
          <p>No image available</p>
        </div>
      )}

      <div className="d-flex justify-content-center">
        <h4>{title}</h4>
      </div>
    </div>
  );
}
