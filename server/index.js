const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users.route");
const productRoutes = require("./routes/products.route");
const adminRoutes = require("./routes/admin.route");
const orderRoutes = require("./routes/orders.route");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(userRoutes, productRoutes, adminRoutes, orderRoutes);
// app.use();

app.listen(5000, async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Server running on port 5000");
  } catch (err) {
    console.log("couldn't connect to server", err);
  }
});
