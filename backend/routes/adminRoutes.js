const express = require("express");
const { handleGetAdminDashboard, handleAddStore, handleGetListOfStores, handleAddUser, handleGetUserList, handleGetUserDetail } = require("../controllers/adminControllers");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const adminRouter = express.Router();

adminRouter.get("/dashboard", protect, adminOnly, handleGetAdminDashboard);
adminRouter.post("/stores", protect, adminOnly, handleAddStore);
adminRouter.get("/stores", protect, adminOnly, handleGetListOfStores);
adminRouter.post("/users", protect, adminOnly, handleAddUser);
adminRouter.get("/users", protect, adminOnly, handleGetUserList);
adminRouter.get("/users/:id", protect, adminOnly, handleGetUserDetail);


module.exports = adminRouter;