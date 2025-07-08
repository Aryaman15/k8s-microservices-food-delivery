const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: String,
  rating: { type: Number, default: 0 },
  operatingHours: {
    open: String,
    close: String
  },
  menu: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu"   
    }
});
module.exports = mongoose.model("Restaurant", restaurantSchema);
