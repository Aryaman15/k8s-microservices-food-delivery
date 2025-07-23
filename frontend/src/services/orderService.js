import axios from "axios";

const ORDER_API = import.meta.env.VITE_ORDER_URL;    

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${ORDER_API}/orders`, orderData, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchMyOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${ORDER_API}/orders/me`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;      // returns an array of orders
};
