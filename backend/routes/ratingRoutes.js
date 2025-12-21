const express = require("express");
const { handleSubmitRating } = require("../controllers/ratingController");
const { protect, userOnly } = require("../middleware/authMiddleware");

const ratingRouter = express.Router();

ratingRouter.post("/", protect, userOnly, handleSubmitRating);

module.exports = ratingRouter;