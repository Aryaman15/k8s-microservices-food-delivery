const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.route("/").get(healthController.index);

module.exports = router;
