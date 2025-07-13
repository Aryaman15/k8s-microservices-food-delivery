import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const RestaurantCard = ({ r }) => (
  <Link
    to={`/restaurants/${r._id}`}
    className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
  >
    <img
      src={r.image}
      alt={r.name}
      className="h-36 w-full object-cover rounded-xl"
    />
    <h3 className="text-lg font-semibold mb-1 flex items-center gap-1">
      {r.name}
      <span className="flex items-center text-yellow-500 ml-auto text-sm font-medium">
        <Star size={16} className="fill-yellow-500" /> {r.rating?.toFixed(1)}
      </span>
    </h3>
    <p className="text-sm text-gray-600">{r.address}</p>
    <p className="text-xs text-blue-600 mt-1">{r.cuisine}</p>
  </Link>
);

export default RestaurantCard;
