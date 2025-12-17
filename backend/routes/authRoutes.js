const express = require("express");
const authRouter = express.Router();

const { handleUserLogin, handleUserLogout, handleUserSignup } = require("../controllers/authController");

authRouter.post("/signup", handleUserSignup);
authRouter.post("/login", handleUserLogin);
authRouter.post("/logout", handleUserLogout);

module.exports = authRouter;