const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true, lowercase: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true, lowercase: true, trim: true},
    price: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true}
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;