import React from "react";
import ShopifyProduct from "./ShopifyProduct";
import "../App.css";

export default function ShopifyProductDisplay({ products }) {
  return (
    <div className="blog-display">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div key={product.node.id} className="m-2">
            <ShopifyProduct
              title={product.node.title}
              image={product.node.images.edges[0]?.node.originalSrc}
            />
          </div>
        ))}
    </div>
  );
}
