const Order = require("../models/orders.model");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      state,
      lga,
      notes,
      paymentMethod,
      cartItems,
      subtotal,
      shipping,
      total,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !state ||
      !lga ||
      !paymentMethod ||
      !cartItems ||
      !subtotal ||
      !shipping ||
      !total
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({
      fullName,
      email,
      phone,
      address,
      state,
      lga,
      notes,
      paymentMethod,
      cartItems,
      subtotal,
      shipping,
      total,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
