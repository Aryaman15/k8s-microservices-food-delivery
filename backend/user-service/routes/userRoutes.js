const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  health,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.get("/health", health);
module.exports = router;
