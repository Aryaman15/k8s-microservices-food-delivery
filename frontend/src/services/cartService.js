import axios from "axios";

const BASE = import.meta.env.VITE_CART_URL + "/api/carts";

const authHdr = () => {
  const token = localStorage.getItem("token");
  return token ? { authorization: `Bearer ${token}` } : {};
};

// Fetch the single cart for this restaurant (0 or 1)
export const fetchCartForRestaurant = async (userId, restaurantId) => {
  try {
    const { data } = await axios.get(
      `${BASE}/user/${userId}/restaurant/${restaurantId}`,
      {
        headers: authHdr(),
      }
    );
    return data;
  } catch (err) {
    //console.log(err);
    if (err.response?.status === 404) {
      return null; // means no cart
    }
    throw err; // propagate others
  }
};

// Add an item (backend auto-creates the 0→1 cart)
export const addToCart = async (
  userId,
  restaurantId,
  menuItemId,
  name,
  price,
  quantity = 1
) => {
  if (!userId) throw new Error("Not authenticated");

  const { data } = await axios.post(
    `${BASE}/items`,
    { userId, restaurantId, menuItemId, name, price, quantity },
    { headers: authHdr() }
  );
  return data; // { cart, item }
};

// Update quantity of a cart-item
export const updateCartItem = (cartId, itemId, quantity) =>
  axios
    .put(
      `${BASE}/${cartId}/items/${itemId}`,
      { quantity },
      { headers: authHdr() }
    )
    .then((r) => r.data);

// Delete a cart-item
export const deleteCartItem = (cartId, itemId) =>
  axios
    .delete(`${BASE}/${cartId}/items/${itemId}`, { headers: authHdr() })
    .then((r) => r.data);

// Fetch just the items in a cart
export const fetchCartItems = (cartId) =>
  axios
    .get(`${BASE}/${cartId}/items`, { headers: authHdr() })
    .then((r) => r.data);

// (optional) fetch all carts for a user
export const fetchCartsByUser = (userId) =>
  axios
    .get(`${BASE}/user/${userId}`, { headers: authHdr() })
    .then((r) => r.data);

// (optional) patch a cart (e.g. status change)
export const updateCart = (cartId, patch) =>
  axios
    .patch(`${BASE}/${cartId}`, patch, { headers: authHdr() })
    .then((r) => r.data);
