const express = require("express");
const orderController = require("../controllers/order.controller");

const Route = express.Router();

// Create a new order
Route.post("/api/create/order", orderController.createOrder);

module.exports = Route;
