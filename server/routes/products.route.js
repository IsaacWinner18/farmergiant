const express = require("express");
const productModel = require("../models/products.model");
const adminAuth = require("../middleware/adminAuth.middleware");
const userModel = require("../models/users.model");

const Route = express.Router();

Route.get("/admin/auth/status", adminAuth, (req, res) => {
  return res.status(200).json({ authenticated: true });
});

// Get all products with optional filtering
Route.get("/api/read/products", async (req, res) => {
  try {
    const {
      category,
      subcategory,
      brand,
      isPublished,
      isFeatured,
      isOnSale,
      inStock,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit = 50,
      page = 1,
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (isPublished !== undefined) filter.isPublished = isPublished === "true";
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";
    if (isOnSale !== undefined) filter.isOnSale = isOnSale === "true";
    if (inStock !== undefined) filter.inStock = inStock === "true";

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await productModel
      .find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await productModel.countDocuments(filter);

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        productsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.log("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single product by ID
Route.get("/api/read/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Increment view count
    await product.incrementViewCount();

    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (err) {
    console.log("Error fetching product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get product by slug
Route.get("/api/read/product/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await productModel.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Increment view count
    await product.incrementViewCount();

    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (err) {
    console.log("Error fetching product by slug:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new product
Route.post("/api/create/product", adminAuth, async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      originalPrice,
      currency = "NGN",
      images,
      thumbnails,
      features,
      specifications,
      inStock = true,
      stockQuantity = 0,
      minStockLevel = 5,
      category,
      subcategory,
      brand,
      tags,
      rating = 0,
      reviewCount = 0,
      isPublished = false,
      isFeatured = false,
      isOnSale = false,
      bestSelling = false,
      metaTitle,
      metaDescription,
      keywords,
      sku,
      weight,
      dimensions,
      warranty,
      shippingInfo,
      notes,
    } = req.body;

    // Validation
    if (!name || !slug || !description || !price || !category) {
      return res.status(400).json({
        message:
          "Missing required fields: name, slug, description, price, and category are required",
      });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    // Check if slug already exists
    const existingProduct = await productModel.findOne({ slug });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this slug already exists" });
    }

    // Check if SKU already exists (if provided)
    if (sku) {
      const existingSku = await productModel.findOne({ sku });
      if (existingSku) {
        return res
          .status(400)
          .json({ message: "Product with this SKU already exists" });
      }
    }

    const newProduct = await productModel.create({
      name,
      slug,
      description,
      price,
      originalPrice,
      currency,
      images: images || [],
      thumbnails: thumbnails || [],
      features: features || [],
      specifications: specifications || {},
      inStock,
      stockQuantity,
      minStockLevel,
      category,
      subcategory,
      brand,
      tags: tags || [],
      rating,
      reviewCount,
      isPublished,
      isFeatured,
      isOnSale,
      bestSelling,
      metaTitle,
      metaDescription,
      keywords: keywords || [],
      sku,
      weight,
      dimensions,
      warranty,
      shippingInfo,
      notes,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.log("Error creating product:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product with this slug or SKU already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update product
Route.put("/api/update/product/:productId", adminAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.createdBy;
    delete updateData.createdAt;
    delete updateData.viewCount;
    delete updateData.cartAddCount;
    delete updateData.purchaseCount;
    delete updateData.wishlistCount;
    delete updateData.shareCount;
    delete updateData.conversionRate;
    delete updateData.averageTimeOnPage;

    updateData.updatedAt = new Date();

    // Check if product exists
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if slug is being changed and if it already exists
    if (updateData.slug && updateData.slug !== existingProduct.slug) {
      const slugExists = await productModel.findOne({
        slug: updateData.slug,
        _id: { $ne: productId },
      });
      if (slugExists) {
        return res
          .status(400)
          .json({ message: "Product with this slug already exists" });
      }
    }

    // Check if SKU is being changed and if it already exists
    if (updateData.sku && updateData.sku !== existingProduct.sku) {
      const skuExists = await productModel.findOne({
        sku: updateData.sku,
        _id: { $ne: productId },
      });
      if (skuExists) {
        return res
          .status(400)
          .json({ message: "Product with this SKU already exists" });
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.log("Error updating product:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product with this slug or SKU already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete product
Route.delete("/api/delete/product/:productId", adminAuth, async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (err) {
    console.log("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get featured products
Route.get("/api/read/products/featured", async (req, res) => {
  try {
    const products = await productModel.getFeatured();
    res.status(200).json({
      message: "Featured products retrieved successfully",
      products,
    });
  } catch (err) {
    console.log("Error fetching featured products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get products by category
Route.get("/api/read/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await productModel.getByCategory(category);
    res.status(200).json({
      message: "Category products retrieved successfully",
      products,
    });
  } catch (err) {
    console.log("Error fetching category products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Increment cart add count
Route.post("/api/product/:productId/increment-cart", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.incrementCartAddCount();

    res.status(200).json({ message: "Cart add count incremented" });
  } catch (err) {
    console.log("Error incrementing cart add count:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update conversion rate
Route.post("/api/product/:productId/update-conversion", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.updateConversionRate();

    res.status(200).json({ message: "Conversion rate updated" });
  } catch (err) {
    console.log("Error updating conversion rate:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin Dashboard Stats
Route.get("/api/admin/dashboard/stats", adminAuth, async (req, res) => {
  try {
    // Total users
    const totalUsers = await userModel.countDocuments({});
    // Revenue: sum of all product purchases (price * purchaseCount)
    const products = await productModel.find({});
    let revenue = 0;
    let productSales = 0;
    let adSales = 0;
    products.forEach((product) => {
      const sales = product.purchaseCount || 0;
      const amount = (product.price || 0) * sales;
      if (product.category && product.category.toLowerCase() === "ads") {
        adSales += sales;
      } else {
        productSales += sales;
      }
      revenue += amount;
    });
    // Recent activity: last 10 purchases (products or ads)
    // We'll assume products with purchaseCount > 0, sorted by updatedAt desc
    const recentActivity = await productModel
      .find({ purchaseCount: { $gt: 0 } })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("title slug price category updatedAt purchaseCount")
      .lean();
    // Format activity for frontend
    const formattedActivity = recentActivity.map((item) => ({
      productTitle: item.name || item.title,
      productSlug: item.slug,
      amount: item.price,
      purchaseDate: item.updatedAt,
      category: item.category,
    }));
    // Growth: dummy values for now
    const growth = 5.2;
    res.status(200).json({
      data: {
        users: { total: totalUsers, growth },
        revenue: { total: revenue, growth },
        productSales: { total: productSales, growth },
        adSales: { total: adSales, growth },
        recentActivity: formattedActivity,
      },
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = Route;
