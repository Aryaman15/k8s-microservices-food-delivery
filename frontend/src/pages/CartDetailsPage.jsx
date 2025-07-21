// src/pages/CartDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../services/cartService";
import { placeOrder } from "../services/orderService";

const CartDetailsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems(id)
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        navigate("/carts");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const res = await placeOrder({
        restaurantId: items[0].restaurantId,
        items,
        deliveryAddress: "123 Main St",
      });
      navigate("#");
      {
        /*navigate(`/orders/${res._id}`);*/
      }
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Failed to place order");
    }
  };

  const total = items.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "number" ? item.price : 0) *
        (typeof item.quantity === "number" ? item.quantity : 1),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500 text-lg">Loading cart...</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          Your cart is empty.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 mb-6">
          {items.map((item) => {
            const price = typeof item.price === "number" ? item.price : 0;
            return (
              <li
                key={item._id}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="ml-2 text-gray-500 text-sm">
                    x {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-gray-800">
                  ${(price * item.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex items-center justify-between border-t pt-4">
        <span className="font-semibold text-lg text-gray-700">Total</span>
        <span className="font-bold text-lg text-green-600">
          ${total.toFixed(2)}
        </span>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="w-full mt-8 px-4 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg font-semibold text-lg disabled:opacity-50"
        disabled={items.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartDetailsPage;
