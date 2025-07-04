const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/userController");
const { protect,isAdmin  } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getProfile);

//for testing admin access
router.get("/admin-test", protect, isAdmin, (req, res) => {
  res.json({ message: "Hello Admin, you passed!" });
});

module.exports = router;