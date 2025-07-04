const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") next();
  else res.status(403).json({ message: "Access denied - Admins only" });
};

module.exports = { protect, isAdmin };