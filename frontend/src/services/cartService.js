import axios from "axios";
const BASE = import.meta.env.VITE_CART_URL + "/api/carts";
const authHdr = () => {
  const t = localStorage.getItem("token");
  return t ? { authorization: `Bearer ${t}` } : {};
};

// Fetch all carts (one per restaurant)
export const fetchCartsByUser = (userId) =>
  axios.get(`${BASE}/user/${userId}`, { headers: authHdr() }).then((r) => {
    console.log("service: ");
    console.log(r.data);
    return r.data;
  });

// Fetch the single cart for this restaurant
export const fetchCartForRestaurant = (userId, restaurantId) =>
  axios
    .get(`${BASE}/user/${userId}/restaurant/${restaurantId}`, {
      headers: authHdr(),
    })
    .then((r) => r.data);

// Add an item (backend auto-creates the 0→1 cart)
export const addToCart = async (
  userId,
  restaurantId,
  menuItemId,
  name,
  price,
  qty = 1
) => {
  if (!userId) throw new Error("Not authenticated");
  console.log(
    userId +
      " " +
      restaurantId +
      " " +
      menuItemId +
      " " +
      name +
      " " +
      price +
      " " +
      qty
  );
  const { data } = await axios.post(
    `${BASE}/items`,
    { userId, restaurantId, menuItemId, name, price, quantity: qty },
    { headers: authHdr() }
  );
  return data; // { cart, item }
};

// …and the other calls stay the same
export const fetchCartItems = (cartId) =>
  axios
    .get(`${BASE}/${cartId}/items`, { headers: authHdr() })
    .then((r) => r.data);

export const updateCartItem = (itemId, qty) =>
  axios
    .put(`${BASE}/items/${itemId}`, { quantity: qty }, { headers: authHdr() })
    .then((r) => r.data);

export const deleteCartItem = (itemId) =>
  axios
    .delete(`${BASE}/items/${itemId}`, { headers: authHdr() })
    .then((r) => r.data);

export const updateCart = (cartId, patch) =>
  axios
    .patch(`${BASE}/${cartId}`, patch, { headers: authHdr() })
    .then((r) => r.data);
