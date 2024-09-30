import React from "react";
import { Alert } from "react-bootstrap";

export default function ShopifyProduct({ product }) {
  const {
    node: { id: productID },
    node: { title },
    node: {
      images: {
        edges: [{ node: { originalSrc: images } = {} } = {}] = [],
      } = {},
    } = {},
  } = product;

  return (
    <div className="text-center border p-2 h-100">
      <div className="col justify-content-center">
        <h5>{title}</h5>
      </div>
      {images ? (
        <div className="p-3">
          <img
            src={images}
            alt=""
            style={{ height: "250px" }}
          />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}>
          <p className="mt-5 border p-2 w-50">No image available</p>
        </div>
      )}
    </div>
  );
}
