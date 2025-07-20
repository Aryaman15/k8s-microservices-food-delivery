const healthController = require("../controllers/healthController");
const express = require("express");
const router = express.Router();

router.get("/", healthController.index);

module.exports = router;
