const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const userRoutes = express.Router();
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const editBalance = require("./controllers/editBalance");

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password", resetPassword);

// Protected routes
userRoutes.use(auth);
userRoutes.get("/dashboard", userDashboard);
userRoutes.patch("/balance", editBalance);

module.exports = userRoutes;
