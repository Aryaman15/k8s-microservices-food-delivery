module.exports.getTotalPrice = (restaurantMenu, items) => {
  let totalPrice = 0;
  for (const item of items) {
    const menuItem = restaurantMenu.find((m) => m.id === item.menuItemId);
    if (!menuItem) {
      return res
        .status(400)
        .json({ error: `Invalid menu item: ${item.menuItemId}` });
    }
    totalPrice += menuItem.price * item.quantity;
  }
  return totalPrice;
};
