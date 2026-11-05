import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cloudbite_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me")
};
export const foodAPI = {
  list: (params) => api.get("/foods", { params }),
  get: (id) => api.get(`/foods/${id}`),
  create: (data) => api.post("/foods", data),
  update: (id, data) => api.put(`/foods/${id}`, data),
  remove: (id) => api.delete(`/foods/${id}`)
};
export const categoryAPI = {
  list: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`)
};
export const orderAPI = {
  create: (data) => api.post("/orders", data),
  mine: () => api.get("/orders/my-orders"),
  get: (id) => api.get(`/orders/${id}`),
  all: () => api.get("/orders"),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};
export const userAPI = {
  all: () => api.get("/users"),
  profile: () => api.get("/users/me"),
  update: (data) => api.put("/users/me", data)
};
export const paymentAPI = {
  create: (amount) => api.post("/payments/create", { amount }),
  verify: (data) => api.post("/payments/verify", data)
};
export const uploadAPI = {
  image: (formData) => api.post("/uploads/image", formData, { headers: { "Content-Type": "multipart/form-data" } })
};
export default api;
