import React from "react";
import ShopifyProduct from "./ShopifyProduct";
import "../App.css";

export default function ShopifyProductDisplay({ products }) {
  
  return (
    <div className="" style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div key={product.node.id} className="m-2">
            <ShopifyProduct
              product={product}
            />
          </div>
        ))}
    </div>
  );
}
