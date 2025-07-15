import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../services/cartService";

const CartDetailsPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCartItems(id).then((res) => setItems(res.data));
  }, [id]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} x {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
      <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded">
        Proceed to Payment
      </button>
    </div>
  );
};
export default CartDetailsPage;
