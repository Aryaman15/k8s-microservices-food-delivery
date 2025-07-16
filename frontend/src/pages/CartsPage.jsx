// src/pages/CartsPage.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchCartsByUser, fetchCartItems } from "../services/cartService";
import { Link, useNavigate } from "react-router-dom";

const CartsPage = () => {
  const { user, loading } = useContext(AuthContext); // read loading too
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (loading) return; // Wait until auth has loaded
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const userId = user._id;
    fetchCartsByUser(userId)
      .then((carts) =>
        Promise.all(
          carts.map(async (cart) => {
            const items = await fetchCartItems(cart._id);
            return { ...cart, itemCount: items.length };
          })
        )
      )
      .then(setCarts)
      .catch(console.error);
  }, [user, navigate, loading]);

  if (loading) return <div className="p-8">Loading...</div>; // Optional: render spinner

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Carts</h2>
      <div className="grid gap-4">
        {carts.length === 0 ? (
          <h1>
            You don't have any carts : ( &nbsp;. Try adding items to cart!
          </h1>
        ) : (
          carts.map((cart) => (
            <Link
              key={cart._id}
              to={`/carts/${cart._id}`}
              className="p-4 border rounded hover:bg-gray-100"
            >
              Cart for {cart.restaurantId} — {cart.itemCount}{" "}
              {cart.itemCount === 1 ? "item" : "items"}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CartsPage;
