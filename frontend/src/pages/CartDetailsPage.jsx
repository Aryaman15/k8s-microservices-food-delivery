// src/pages/CartDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../services/cartService";

const CartDetailsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems(id)
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        // if cart not found or auth failure, redirect to carts page
        navigate("/carts");
      });
  }, [id, navigate]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      <ul>
        {items.map((item) => {
          // Safely default price to 0 if missing
          const price = typeof item.price === "number" ? item.price : 0;
          return (
            <li key={item._id}>
              {item.name} x {item.quantity} — ${price.toFixed(2)}
            </li>
          );
        })}
      </ul>
      <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded">
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartDetailsPage;
