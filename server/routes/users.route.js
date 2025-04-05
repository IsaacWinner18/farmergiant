const express = require("express");
const Route = express.Router();

const signUpController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller")
const authMiddleware = require("../middleware/auth.middleware")

Route.post("/signup", signUpController);
Route.post("/login", loginController);
Route.get("/auth/status", authMiddleware);


module.exports = Route;
