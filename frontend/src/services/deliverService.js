// src/services/deliveryService.js
import axios from "axios";
const deliveryApi = axios.create({
  baseURL: import.meta.env.VITE_DELIVERY_URL,  // http://localhost:3001
});
deliveryApi.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.authorization = `Bearer ${token}`;
  return cfg;
});

export const fetchActiveDeliveries = () =>
  deliveryApi.get("/deliveries/user/me/active").then(r => r.data);
