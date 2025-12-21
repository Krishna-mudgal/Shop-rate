const express = require("express");
const { handleGetStoresForUsers } = require("../controllers/userController");
const { protect, userOnly } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.get("/stores", protect, userOnly, handleGetStoresForUsers);

module.exports = userRouter;