import React, { useEffect, useState } from "react";
import { getShopifyProducts } from "../api/shopify";
import ShopifyProductDisplay from "./ShopifyProductDisplay";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const query = `{
            products(first: 10){edges{node{id title images(first: 1) {edges {node {originalSrc }}}}}}}`;
    getShopifyProducts(query)
      .then(({data}) => {
        setIsLoading(false);
        setProducts(data.products.edges);
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading posts...</p>
      </div>
    );
  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="container">
      <div>{products && <ShopifyProductDisplay products={products} />}</div>
    </div>
  );
}
