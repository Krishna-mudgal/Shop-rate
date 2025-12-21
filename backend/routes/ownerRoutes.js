const express = require("express");
const { handleGetOwnerDashboard } = require("../controllers/ownerController");
const { protect, ownerOnly } = require("../middleware/authMiddleware");
const ownerRouter = express.Router();

ownerRouter.get("/dashboard", protect, ownerOnly, handleGetOwnerDashboard);

module.exports = ownerRouter;