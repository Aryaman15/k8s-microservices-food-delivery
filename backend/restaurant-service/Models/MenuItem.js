const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      category: String
    }
  ]
});

module.exports = mongoose.model("Menu", menuSchema);