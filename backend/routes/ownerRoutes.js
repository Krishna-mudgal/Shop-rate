const express = require("express");
const { handleGetOwnerDashboard } = require("../controllers/ownerController");
const { protect, ownerOnly } = require("../middleware/authMiddleware");
const { handleUpdatePassword } = require("../controllers/authController");
const ownerRouter = express.Router();

ownerRouter.get("/dashboard", protect, ownerOnly, handleGetOwnerDashboard);
ownerRouter.put("/update-password", protect, ownerOnly, handleUpdatePassword);

module.exports = ownerRouter;