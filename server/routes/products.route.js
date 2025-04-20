const express = require("express")
const productModel = require("../models/products.model")
const adminAuth = require("../middleware/adminAuth.middleware")

const Route = express.Router();

Route.get("/admin/auth/status", adminAuth, (req, res) => {
  return res.status(200).json({ authenticated: true });
});

Route.get("/api/read/products", async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json({ message: "GET successful", products})

    } catch (err) {
        console.log("the product get error", err)
    }
})

Route.post("/api/create/product", adminAuth, async (req, res) => {
    const { name, slug, description, price, imageUrl } = req.body;
    try {
        if (name || slug || description || price || image) {
            const newProduct = await productModel.create(
              {name,
              slug,
              description,
              price,
              imageUrl}
            );

            res.status(200).json({ message: "POST successful"})
        }

    } catch (err) {
        console.log("the product post error", err)
    }

})

Route.delete("/api/delete/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (err) {
    console.log("this is the error from the delete", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route.post("/admin", adminAuth)

module.exports = Route