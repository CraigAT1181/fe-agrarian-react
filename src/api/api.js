import axios from "axios";

const api = axios.create({
  baseURL: "https://cookingpot.onrender.com",
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

export const getAds = async () => {
  const { data } = await api.get("/ads");

  return data;
};

export const getBlogs = async () => {
  const { data } = await api.get("/blogs");

  return data;
};

export const getActivities = async () => {
  const { data } = await api.get("/activities");

  return data;
};

export const getBlogsByUserID = async (userID) => {
  const { data } = await api.get(`/users/${userID}/blogs`);

  return data;
};

export const getSingleBlog = async (blog_id) => {
  const { data } = await api.get(`/blogs/${blog_id}`);

  return data;
};

export const createBlog = async (formData) => {
  try {
    const response = await api.post("/blogs", formData);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to create blog");
  }
};

export const deleteBlog = async (blog_id) => {
  await api.delete(`/blogs/${blog_id}`);
};

export const patchBlog = async (blog_id, formData) => {
  const { data } = await api.patch(`/blogs/${blog_id}`, formData);

  return data;
};

export const getCommentsByBlogID = async (blog_id) => {
  const { data } = await api.get(`/blogs/${blog_id}/comments`);

  return data;
};

export const postComment = async (
  blog_id,
  user_id,
  comment,
  parent_comment_id = null
) => {
  const { data } = await api.post(`/blogs/${blog_id}/comments`, {
    user_id: user_id,
    comment: comment,
    parent_comment_id: parent_comment_id,
  });

  return data;
};

export const editComment = async (blog_id, comment_id, comment) => {
  const { data } = await api.patch(`blogs/${blog_id}/comments/${comment_id}`, {
    comment: comment,
  });

  return data;
};

export const deleteComment = async (blog_id, comment_id) => {
  await api.delete(`/blogs/${blog_id}/comments/${comment_id}`);
};

export const getUsersByProduceName = async (produceList) => {
  const { data } = await api.get(`/users/${produceList}`);

  return data;
};

export const getConversationsByUserID = async (userID) => {
  const { data } = await api.get(`/users/${userID}/conversations`);

  return data;
};

export const addConversationByUserID = async (userID, partnerID) => {
  const { data } = await api.post(`/users/${userID}/conversations`, {
    user1_id: userID,
    user2_id: partnerID,
  });

  return data;
};

export const deleteConversation = async (userID, conversationID) => {
  const { data } = await api.patch(`/conversations/${conversationID}`, {
    user_id: userID,
  });

  return data;
};

export const getMessagesByConverationID = async (conversationID) => {
  const { data } = await api.get(`/conversations/${conversationID}/messages`);

  return data;
};

export const sendMessage = async (conversationID, senderID, message) => {
  const { data } = await api.post(`/conversations/${conversationID}/messages`, {
    sender_id: senderID,
    message: message,
  });

  return data;
};

export const userLogin = async (username, password) => {
  const { data } = await api.post("/authenticate", {
    username: username,
    password: password,
  });

  return data;
};

export const requestLink = async (email) => {
  const { data } = await api.post("/reset-request", {
    email: email,
  });

  return data;
};

export const passwordRequest = async (newPassword, token) => {
  const { data } = await api.post("/set-new-password", {
    new_password: newPassword,
    token: token,
  });

  return data;
};

export const register = async (username, email, password, postcode) => {
  const { data } = await api.post("/users", {
    username: username,
    email: email,
    password: password,
    postcode: postcode,
  });

  return data;
};

export const deleteUser = async (user_id) => {
  await api.delete(`/users/${user_id}`);
};

export const updateUserProduce = async (user_id, userProduce) => {
  const { data } = await api.patch(`/users/${user_id}/produce`, userProduce);

  return data;
};

export const getPosts = async (searchQuery) => {
  const { data } = await api.get(`/posts?${searchQuery}`);

  return data;
};

export const createPost = async (user_id, status, type, item, image, body) => {
  const { data } = await api.post(`/users/${user_id}/posts`, {
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

export const contactForm = async (name, email, message) => {
  await api.post("/contact", {
    name: name,
    email: email,
    message: message,
  });
};
