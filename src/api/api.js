import axios from "axios";

const api = axios.create({
  baseURL: "https://agrarian-pw89.onrender.com",
});

export default api;

export const getUsers = async () => {
  const { data } = await api.get(`/users`);

  return data;
};

export const getProduce = async () => {
  const { data } = await api.get("/produce");

  return data;
};

export const getUsersByProduceName = async (produceList) => {
  const { data } = await api.get(`/users/${produceList}`);

  return data;
};
