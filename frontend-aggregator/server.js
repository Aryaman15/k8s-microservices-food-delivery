// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // For parsing form data
const axios = require("axios");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Set the view engine to EJS and point to the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home page route
app.get("/", (req, res) => {
  res.render("index"); // Renders views/index.ejs
});

// Render Login page
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Handle login form submission with actual API call
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Call the user service's authentication endpoint
    const response = await axios.post("http://localhost:3001/auth/login", {
      username,
      password,
    });
    // On success, render the dashboard with user info from the API response
    res.render("dashboard", { user: response.data.userId || username });
  } catch (error) {
    // If the API returns an error, display that error message on the login page
    const errMsg =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "Login failed";
    res.render("login", { error: errMsg });
  }
});

// Render Register page
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Handle registration form submission
// Handle registration form submission with actual API call
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Call the user service endpoint for creating a new user
    const response = await axios.post("http://localhost:3001/users", {
      username,
      email,
      password,
    });
    res.render("register-success", { username: response.data.username });
  } catch (error) {
    const errMsg =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "Registration failed";
    res.render("register", { error: errMsg });
  }
});

// Render Add Order page
app.get("/add-order", (req, res) => {
  res.render("add-order", { error: null });
});

// Handle Add Order form submission
// Handle Add Order form submission with actual API call
app.post("/add-order", async (req, res) => {
  const orderData = req.body;
  try {
    // Call the order service endpoint for placing a new order
    const response = await axios.post(
      "http://localhost:3003/orders",
      orderData
    );
    res.render("order-success", { order: response.data });
  } catch (error) {
    const errMsg =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "Error placing order";
    res.render("add-order", { error: errMsg });
  }
});

// Render Add Restaurant page
app.get("/add-restaurant", (req, res) => {
  res.render("add-restaurant", { error: null });
});

// Handle Add Restaurant form submission
// Handle Add Restaurant form submission with actual API call
app.post("/add-restaurant", async (req, res) => {
  const restaurantData = req.body;
  try {
    // Call the restaurant service endpoint to add a new restaurant
    const response = await axios.post(
      "http://localhost:3002/restaurants",
      restaurantData
    );
    res.render("restaurant-success", { restaurant: response.data });
  } catch (error) {
    const errMsg =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "Error adding restaurant";
    res.render("add-restaurant", { error: errMsg });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
