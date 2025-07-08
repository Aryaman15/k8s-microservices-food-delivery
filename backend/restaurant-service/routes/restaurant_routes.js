const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers.js");

// Health check
router.get("/health", controller.healthCheck);

// Restaurants
router.get("/restaurants", controller.getAllRestaurants);
router.get("/restaurants/:id", controller.getRestaurantById);
router.post("/restaurants", controller.createRestaurant);
router.put("/restaurants/:id", controller.updateRestaurant);

// Menu
router.post("/restaurants/:id/menu", controller.addMenu);
router.get("/restaurants/:id/menu", controller.getMenu);

module.exports = router;
