const MenuItemCard = ({ item }) => (
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

    <button className="self-start bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full transition">
      Add to Cart
    </button>
  </div>
);

export default MenuItemCard;
