const express = require("express");
const adminAuth = require("../middleware/adminAuth.middleware");
const userModel = require("../models/users.model");

const Route = express.Router();

// Get all users (admin only)
Route.get("/api/admin/users", adminAuth, async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

module.exports = Route;
