import axios from "axios";

const api = axios.create({
  baseURL: "https://agrarian-pw89.onrender.com/",
});

export default api;

