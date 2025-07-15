import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { addToCart } from "../../services/cartService";

const MenuItemCard = ({ item, restaurantId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in or sign up to add items to your cart.");
      return navigate("/login", { replace: true });
    }

    try {
      // MenuItemCard.jsx
      await addToCart(
        user._id,
        restaurantId,
        item._id,
        item.name,
        item.price,
        1
      );

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-36 w-full object-cover rounded-xl"
      />

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <p className="font-medium">${item.price.toFixed(2)}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItemCard;
