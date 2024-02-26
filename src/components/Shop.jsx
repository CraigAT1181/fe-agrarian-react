import React, { useEffect, useState } from "react";
import { getShopifyProducts } from "../api/shopify";

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchShopifyProducts = async () => {
      try {
        const query = `{
            products(first: 10){edges{node{id title images(first: 1) {edges {node {originalSrc }}}}}}}`;
        const shopProducts = await getShopifyProducts(query);

        setProducts((prevProducts) => [...prevProducts, shopProducts]);
        console.log("Shopify products:", products);
      } catch (error) {
        console.error("Error fetching Shopify products:", error);
      }
    };

    fetchShopifyProducts();
  }, []);

  useEffect(() => {
    // Log the updated state whenever products change
    console.log("Shopify products:", products);
  }, [products]);

  return (
    <div>
      {products &&
        products.map((product, productIndex) => (
          <div key={productIndex}>
            {product.data.products.edges.map((node, nodeIndex) => (
              <div key={nodeIndex}>
                {node.node.images.edges.map((image, imageIndex) => (
                  <div key={imageIndex}>
                    <img
                      key={imageIndex}
                      style={{height: "150px"}}
                      src={image.node.originalSrc}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
  
};

export default MyComponent;
