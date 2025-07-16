import { useState, useEffect } from "react";
import {
  fetchCartForRestaurant,
  fetchCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../services/cartService";

export function useCartItem(userId, restaurantId, menuItemId, name, price) {
  const [cartId, setCartId] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    fetchCartForRestaurant(userId, restaurantId)
      .then((cart) => {
        if (!cart) {
          setCartId(null);
          setCount(0);
          return;
        }
        setCartId(cart._id);
        return fetchCartItems(cart._id);
      })
      .then((items) => {
        if (!items) return;
        const found = items.find((ci) => ci.menuItemId === menuItemId);
        setCount(found ? found.quantity : 0);
      })
      .catch((err) => {
        console.error("Unexpected error fetching cart:", err);
      });
  }, [userId, restaurantId, menuItemId]);

  const increment = async () => {
    if (!userId) throw new Error("Not authenticated");
    const { cart } = await addToCart(
      userId,
      restaurantId,
      menuItemId,
      name,
      price,
      count + 1
    );
    setCartId(cart._id);
    setCount((c) => c + 1);
  };

  const decrement = async () => {
    if (count <= 1) {
      await deleteCartItem(cartId, menuItemId);
      setCount(0);
    } else {
      const updated = await updateCartItem(cartId, menuItemId, count - 1);
      setCount(updated.quantity);
    }
  };

  return { cartId, count, increment, decrement };
}
