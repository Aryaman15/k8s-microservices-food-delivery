module.exports.index = (req, res) => {
  res.status(200).json({ status: "Delivery service is healthy" });
};
