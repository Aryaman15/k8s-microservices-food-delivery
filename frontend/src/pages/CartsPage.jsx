import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCartsByUser, fetchCartItems } from "../services/cartService";

const CartsPage = () => {
  const [carts, setCarts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // 1️⃣ Load carts
    fetchCartsByUser(userId)
      .then((carts) => {
        // 2️⃣ For each cart, load items and attach count
        return Promise.all(
          carts.map(async (cart) => {
            const items = await fetchCartItems(cart._id);
            return { ...cart, itemCount: items.length };
          })
        );
      })
      .then((cartsWithCounts) => setCarts(cartsWithCounts))
      .catch(console.error);
  }, [userId]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Carts</h2>
      <div className="grid gap-4">
        {carts.map((cart) => (
          <Link
            key={cart._id}
            to={`/carts/${cart._id}`}
            className="p-4 border rounded hover:bg-gray-100"
          >
            Cart for {cart.restaurantId} — {cart.itemCount} item
            {cart.itemCount !== 1 && "s"}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CartsPage;
