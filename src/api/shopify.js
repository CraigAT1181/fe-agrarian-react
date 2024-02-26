import axios from "axios";

const shopifyApi = axios.create({
  baseURL: "https://agrarian-pw89.onrender.com",
});

export default shopifyApi;

export const getShopifyProducts = async (query) => {
  try {
    const { data } = await shopifyApi.post("/api/shopify/products", { query });
    return data;
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    throw error;
  }
};
