import axios from "axios";

const BASE_URL = import.meta.env.VITE_CART_URL + "/api/carts";

// Get token from localStorage helper
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  //console.log(token);
  return token ? { authorization: `Bearer ${token}` } : {};
};

// Fetch all carts for a user
export const fetchCartsByUser = (userId) => {
  if (!userId) return Promise.reject(new Error("Not authenticated"));
  return axios.get(`${BASE_URL}/user/${userId}`, {
    headers: getAuthHeader(),
  });
};

// Fetch all items in a specific cart
export const fetchCartItems = (cartId) => {
  if (!cartId) return Promise.reject(new Error("Cart ID is required"));
  return axios.get(`${BASE_URL}/${cartId}/items`, {
    headers: getAuthHeader(),
  });
};

// Add item to cart (creating cart if needed)
export const addToCart = async (userId, restaurantId, item) => {
  if (!userId) throw new Error("Not authenticated");
  let cart;

  try {
    const cartRes = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: getAuthHeader(),
    });
    cart = cartRes.data;

    if (!cart || cart.restaurantId !== restaurantId) {
      const newCartRes = await axios.post(
        BASE_URL,
        { userId, restaurantId },
        {
          headers: getAuthHeader(),
        }
      );
      cart = newCartRes.data;
    }
  } catch (err) {
    if (err.response?.status === 404) {
      const newCartRes = await axios.post(
        BASE_URL,
        { userId, restaurantId },
        {
          headers: getAuthHeader(),
        }
      );
      cart = newCartRes.data;
    } else {
      throw err;
    }
  }

  // Add item to that cart
  const addItemRes = await axios.post(
    `${BASE_URL}/${cart._id}/items`,
    {
      cartId: cart._id,
      name: item.name,
      price: item.price,
      quantity: 1,
    },
    {
      headers: getAuthHeader(),
    }
  );

  return {
    cart,
    newItem: addItemRes.data,
  };
};
