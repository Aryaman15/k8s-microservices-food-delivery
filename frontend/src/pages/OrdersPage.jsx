import { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/orderService";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchMyOrders().then(setOrders).catch(console.error);
  }, []);
  if (!orders) {
    return <p className="text-center py-12 text-gray-500">Loading orders…</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Your Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      )}

      {orders.map((o) => (
        <div
          key={o._id}
          className="border rounded-lg shadow-sm p-4 mb-4 bg-white"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{new Date(o.createdAt).toLocaleString()}</span>
            <span className="font-semibold">{o.status}</span>
          </div>

          <ul className="list-disc list-inside text-gray-800">
            {o.items.map((it) => (
              <li key={it.menuItemId}>
                {it.name} × {it.quantity} — $
                {(it.price * it.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <div className="text-right font-bold mt-2 text-green-600">
            Total: ${o.totalPrice}
          </div>
        </div>
      ))}
    </div>
  );
}