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

export const getConversationsByUserID = async (user_id) => {
  const { data } = await api.get(`/users/${user_id}/conversations`);

  return data;
};

export const userLogin = async (username, password) => {
  const { data } = await api.post("/authenticate", {
    username: username,
    password: password,
  });

  return data;
};

export const register = async (username, email, password, postcode) => {
  const { data } = await api.post("/users", {
    user_name: username,
    email: email,
    password: password,
    postcode: postcode,
  });

  return data;
};

export const deleteUser = async (user_id) => {
  await api.delete(`/users/${user_id}`);
};

export const setUserProduce = async (user_id, userProduce) => {
  const { data } = await api.patch(`/users/${user_id}`, userProduce);

  return data;
};

export const getPosts = async (searchQuery) => {
  const { data } = await api.get(`/posts?${searchQuery}`);

  return data;
};

export const createPost = async (user_id, status, type, item, image, body) => {
  const { data } = await api.post(`/posts/${user_id}`, {
    status: status,
    type: type,
    item: item,
    image: image,
    body: body,
  });

  return data;
};

export const deletePost = async (post_id) => {
  await api.delete(`/posts/${post_id}`);
};
