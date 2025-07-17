const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      default: "NGN",
    },

    // Images
    images: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnails: [
      {
        type: String,
      },
    ],

    // Product Details
    features: [
      {
        type: String,
      },
    ],
    specifications: {
      type: mongoose.Schema.Types.Mixed,
    },

    // Inventory & Stock
    inStock: {
      type: Boolean,
      default: true,
      index: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    minStockLevel: {
      type: Number,
      default: 5,
    },

    // Categories & Classification
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
      index: true,
    },
    brand: {
      type: String,
      index: true,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],

    // Ratings & Reviews
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Publishing & Status
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
      index: true,
    },

    // SEO & Meta
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: [
      {
        type: String,
      },
    ],

    // Analytics & Tracking
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    cartAddCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    purchaseCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    wishlistCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Performance Metrics
    conversionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    averageTimeOnPage: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    publishedAt: {
      type: Date,
    },

    // Additional Fields
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
    },
    warranty: {
      type: String,
    },
    shippingInfo: {
      type: String,
    },

    // Admin/Management
    notes: {
      type: String,
    },
    bestSelling: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.price < this.originalPrice) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Virtual for formatted price
productSchema.virtual("formattedPrice").get(function () {
  return `₦${this.price.toLocaleString()}`;
});

// Virtual for formatted original price
productSchema.virtual("formattedOriginalPrice").get(function () {
  if (this.originalPrice) {
    return `₦${this.originalPrice.toLocaleString()}`;
  }
  return null;
});

// Indexes for better query performance
productSchema.index({ category: 1, isPublished: 1 });
productSchema.index({ brand: 1, isPublished: 1 });
productSchema.index({ isFeatured: 1, isPublished: 1 });
productSchema.index({ isOnSale: 1, isPublished: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ viewCount: -1 });
productSchema.index({ createdAt: -1 });

// Pre-save middleware to update timestamps
productSchema.pre("save", function (next) {
  this.updatedAt = new Date();

  // Set publishedAt when publishing for the first time
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Static method to get featured products
productSchema.statics.getFeatured = function () {
  return this.find({
    isPublished: true,
    isFeatured: true,
  }).sort({ createdAt: -1 });
};

// Static method to get products by category
productSchema.statics.getByCategory = function (category) {
  return this.find({
    category: category,
    isPublished: true,
  }).sort({ createdAt: -1 });
};

// Instance method to increment view count
productSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};

// Instance method to increment cart add count
productSchema.methods.incrementCartAddCount = function () {
  this.cartAddCount += 1;
  return this.save();
};

// Instance method to update conversion rate
productSchema.methods.updateConversionRate = function () {
  if (this.viewCount > 0) {
    this.conversionRate = (this.purchaseCount / this.viewCount) * 100;
  }
  return this.save();
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
