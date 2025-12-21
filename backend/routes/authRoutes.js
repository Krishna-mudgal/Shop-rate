const express = require("express");
const authRouter = express.Router();
const { protect, ownerOnly } = require("../middleware/authMiddleware");
const { handleUserLogin, handleUserLogout, handleUserSignup, handleUpdatePassword } = require("../controllers/authController");

authRouter.post("/signup", handleUserSignup);
authRouter.post("/login", handleUserLogin);
authRouter.post("/logout", handleUserLogout);
authRouter.put("/update-password", protect,  handleUpdatePassword); 

module.exports = authRouter;