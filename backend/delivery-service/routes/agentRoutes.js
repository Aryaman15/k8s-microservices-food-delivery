const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/")
  .get(wrapAsync(agentController.allAgents))
  .post(wrapAsync(agentController.newAgent));

module.exports = router;
