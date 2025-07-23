import { useEffect, useState } from "react";
import { fetchActiveDeliveries } from "../services/deliverService";

export default function DeliveriesPage() {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetchActiveDeliveries().then(setList).catch(console.error);
  }, []);

  if (!list) return <p className="text-center py-10">Loading deliveries…</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Active Deliveries
      </h1>

      {list.length === 0 && (
        <p className="text-gray-600">No orders currently on the way.</p>
      )}

      {list.map((d) => (
        <div key={d._id} className="border rounded-lg p-4 mb-4 bg-white shadow">
          <div className="flex justify-between mb-1 text-sm text-gray-600">
            <span>Order ID: <span className="font-mono">{d.orderId}</span></span>
            <span className="font-semibold">{d.status}</span>
          </div>
          <p className="text-gray-700">
            Delivering to <span className="font-semibold">{d.deliveryAddress}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Created {new Date(d.createdAt).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}
