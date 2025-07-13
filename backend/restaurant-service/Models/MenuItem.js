const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      category: String,
      image: {
        type: String,
        default:
          "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=",
      },
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
