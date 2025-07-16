// src/components/ui/MenuItemCard.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./card";
import { CartCounter } from "./CartCounter";
import { AuthContext } from "../../contexts/AuthContext";
import { useCartItem } from "../../hooks/useCartItem";

export default function MenuItemCard({ item, restaurantId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // only pass the three args the hook expects
  const { count, increment, decrement } = useCartItem(
    user?._id || "",
    restaurantId,
    item._id,
    item.name,
    item.price
  );

  const handleAddClick = () => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    increment();
  };

  return (
    <Card className="max-w-sm">
      <img
        src={item.image}
        alt={item.name}
        className="h-36 w-full object-cover rounded-t-lg"
      />
      <CardContent className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <p className="text-base font-medium">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {count > 0 ? (
          <CartCounter
            count={count}
            onIncrement={increment}
            onDecrement={decrement}
          />
        ) : (
          <button
            onClick={handleAddClick}
            className="w-full bg-blue-600 text-white py-1 rounded"
          >
            Add to Cart
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
