const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //console.log(token);
  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = decoded; // this will be { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};