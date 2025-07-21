import axios from "axios";

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${import.meta.env.VITE_ORDER_URL}/orders`,
    orderData,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
