// init/initRestaurants.js
const mongoose = require("mongoose");
const Restaurant = require("../Models/restaurant");
const Menu = require("../Models/MenuItem");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/restaurant-service";

const dummyData = [
  {
    name: "Spice Garden",
    address: "123 MG Road, Bangalore",
    cuisine: "Indian",
    rating: 4.3,
    operatingHours: { open: "10:00 AM", close: "10:00 PM" },
    menuItems: [
      { name: "Butter Chicken", price: 250, category: "Main Course" },
      { name: "Paneer Tikka", price: 200, category: "Starter" },
    ],
  },
  {
    name: "Sushi Express",
    address: "456 Tokyo Street, Delhi",
    cuisine: "Japanese",
    rating: 4.7,
    operatingHours: { open: "12:00 PM", close: "11:00 PM" },
    menuItems: [
      { name: "Salmon Nigiri", price: 300, category: "Sushi" },
      { name: "Tuna Maki", price: 280, category: "Sushi" },
    ],
  },
  {
    name: "Pasta Fiesta",
    address: "789 Italian Lane, Mumbai",
    cuisine: "Italian",
    rating: 4.1,
    operatingHours: { open: "11:00 AM", close: "10:30 PM" },
    menuItems: [
      { name: "Spaghetti Carbonara", price: 350, category: "Pasta" },
      { name: "Margherita Pizza", price: 400, category: "Pizza" },
    ],
  },
  {
    name: "Burger Hub",
    address: "101 Drive Thru, Hyderabad",
    cuisine: "American",
    rating: 3.9,
    operatingHours: { open: "09:00 AM", close: "11:00 PM" },
    menuItems: [
      { name: "Cheeseburger", price: 180, category: "Burgers" },
      { name: "Fries", price: 90, category: "Sides" },
    ],
  },
  {
    name: "Tandoori Nights",
    address: "33 Flame Street, Pune",
    cuisine: "Mughlai",
    rating: 4.5,
    operatingHours: { open: "05:00 PM", close: "12:00 AM" },
    menuItems: [
      { name: "Chicken Tandoori", price: 260, category: "Grill" },
      { name: "Seekh Kebab", price: 220, category: "Grill" },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});
    console.log("🗑️  Cleared existing Restaurant & Menu collections");

    for (const data of dummyData) {
      // 1) Create restaurant without menu ref
      const { menuItems, ...rest } = data;
      const restaurant = await Restaurant.create(rest);
      console.log(`🍽️  Restaurant created: ${restaurant.name}`);

      // 2) Create its menu
      const menuDoc = await Menu.create({ items: menuItems });
      console.log(`📋  Menu created for ${restaurant.name}`);

      // 3) Link menu to restaurant
      restaurant.menu = menuDoc._id;
      await restaurant.save();
      console.log(`🔗  Linked menu (${menuDoc._id}) → ${restaurant.name}`);
    }

    console.log("🎉 Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
