import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCartsByUser } from "../services/cartService";

const CartsPage = () => {
  const [carts, setCarts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCartsByUser(userId).then((res) => setCarts(res.data));
  }, []);

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
            Cart for {cart.restaurantId} - {cart.items.length} items
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CartsPage;
