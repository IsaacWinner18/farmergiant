const express = require("express");
const jwt = require("jsonwebtoken");

const Route = express.Router();

const signUpController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller")
const authMiddleware = require("../middleware/auth.middleware")

Route.post("/signup", signUpController);
Route.post("/login", loginController);
Route.get("/auth/status", authMiddleware, (req, res) => {
  return res.status(200).json({ authenticated: true });
});
Route.get("/auth/logout", (req, res) => {   
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
})

module.exports = Route;
