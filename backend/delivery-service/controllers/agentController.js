const { DeliveryAgent } = require("../models/delivery.js");

// Create delivery agent
// /agents
module.exports.allAgents = async (req, res) => {
  try {
    const agent = new DeliveryAgent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all delivery agents
// /agents
module.exports.newAgent = async (req, res) => {
  try {
    const agents = await DeliveryAgent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
