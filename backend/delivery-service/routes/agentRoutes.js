const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

router.route("/").get(agentController.allAgents).post(agentController.newAgent);

module.exports = router;
