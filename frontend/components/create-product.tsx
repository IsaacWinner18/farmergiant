"use client";

import * as React from "react";
import {
  Save,
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Tag,
  FileText,
  Globe,
  Settings,
  Eye,
  EyeOff,
  Package,
  BarChart3,
} from "lucide-react";
import Image from "next/image";

interface CreateProductProps {
  editingProduct?: any;
  onClearEdit?: () => void;
  onProductSaved?: () => void;
}

export function CreateProduct({
  editingProduct,
  onClearEdit,
  onProductSaved,
}: CreateProductProps) {
  const [formData, setFormData] = React.useState({
    name: editingProduct?.name || "",
    description: editingProduct?.description || "",
    price: editingProduct?.price || "",
    originalPrice: editingProduct?.originalPrice || "",
    currency: editingProduct?.currency || "NGN",
    category: editingProduct?.category || "",
    subcategory: editingProduct?.subcategory || "",
    slug: editingProduct?.slug || "",
    brand: editingProduct?.brand || "",
    features: editingProduct?.features || [],
    images: editingProduct?.images || [],
    thumbnails: editingProduct?.thumbnails || [],
    tags: editingProduct?.tags || [],
    keywords: editingProduct?.keywords || [],
    stockQuantity: editingProduct?.stockQuantity || 0,
    minStockLevel: editingProduct?.minStockLevel || 5,
    inStock:
      editingProduct?.inStock !== undefined ? editingProduct.inStock : true,
    isPublished: editingProduct?.isPublished || false,
    isFeatured: editingProduct?.isFeatured || false,
    isOnSale: editingProduct?.isOnSale || false,
    bestSelling: editingProduct?.bestSelling || false,
    metaTitle: editingProduct?.metaTitle || "",
    metaDescription: editingProduct?.metaDescription || "",
    specifications: editingProduct?.specifications || {},
    weight: editingProduct?.weight || "",
    dimensions: editingProduct?.dimensions || {
      length: "",
      width: "",
      height: "",
    },
    warranty: editingProduct?.warranty || "",
    shippingInfo: editingProduct?.shippingInfo || "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [newFeature, setNewFeature] = React.useState("");
  const [newTag, setNewTag] = React.useState("");
  const [newKeyword, setNewKeyword] = React.useState("");
  const [newImage, setNewImage] = React.useState("");

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books & Media",
    "Health & Beauty",
    "Automotive",
    "Toys & Games",
    "Food & Beverages",
    "Jewelry & Watches",
    "Tools & Hardware",
    "Pet Supplies",
    "Office Supplies",
    "Baby & Kids",
    "Fashion Accessories",
  ];

  const subcategories = {
    Electronics: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Cameras",
      "Audio",
      "Gaming",
    ],
    Clothing: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Clothing",
      "Shoes",
      "Accessories",
    ],
    "Home & Garden": [
      "Furniture",
      "Kitchen & Dining",
      "Decor",
      "Garden Tools",
      "Lighting",
    ],
    "Sports & Outdoors": [
      "Fitness",
      "Camping",
      "Hiking",
      "Team Sports",
      "Water Sports",
    ],
    "Books & Media": [
      "Fiction",
      "Non-Fiction",
      "Educational",
      "Magazines",
      "Digital Media",
    ],
    "Health & Beauty": [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Personal Care",
      "Vitamins",
    ],
    Automotive: ["Car Parts", "Car Care", "Motorcycle", "Truck", "RV"],
    "Toys & Games": [
      "Board Games",
      "Video Games",
      "Educational Toys",
      "Outdoor Toys",
    ],
    "Food & Beverages": [
      "Snacks",
      "Beverages",
      "Organic",
      "Gourmet",
      "Supplements",
    ],
    "Jewelry & Watches": [
      "Necklaces",
      "Rings",
      "Watches",
      "Earrings",
      "Bracelets",
    ],
    "Tools & Hardware": [
      "Power Tools",
      "Hand Tools",
      "Plumbing",
      "Electrical",
      "Safety",
    ],
    "Pet Supplies": ["Dog", "Cat", "Fish", "Bird", "Small Animals"],
    "Office Supplies": [
      "Paper",
      "Pens",
      "Desk Accessories",
      "Storage",
      "Technology",
    ],
    "Baby & Kids": ["Diapers", "Toys", "Clothing", "Feeding", "Safety"],
    "Fashion Accessories": [
      "Bags",
      "Wallets",
      "Sunglasses",
      "Belts",
      "Scarves",
    ],
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const url = editingProduct
        ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/update/product/${editingProduct._id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URI}/api/create/product`;

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      onProductSaved?.();
    } catch (error: any) {
      console.error("Error saving product:", error);
      setErrors({ submit: error.message || "Failed to save product" });
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      handleInputChange("features", [...formData.features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    handleInputChange(
      "features",
      formData.features.filter((_: any, i: number) => i !== index)
    );
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    handleInputChange(
      "tags",
      formData.tags.filter((_: any, i: number) => i !== index)
    );
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      handleInputChange("keywords", [...formData.keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    handleInputChange(
      "keywords",
      formData.keywords.filter((_: any, i: number) => i !== index)
    );
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      handleInputChange("images", [...formData.images, newImage.trim()]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    handleInputChange(
      "images",
      formData.images.filter((_: any, i: number) => i !== index)
    );
  };

  // Add this function for Cloudinary upload
  const handleCloudinaryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const cloudName = process.env.NEXT_PUBLIC_IMAGE_CLOUD_NAME;
    const unsignedPreset = process.env.NEXT_PUBLIC_IMAGE_CLOUD_SIGN;
    if (!cloudName || !unsignedPreset) {
      alert("Cloudinary config missing");
      return;
    }
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", unsignedPreset);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      } catch (err) {
        console.error("Cloudinary upload error", err);
      }
    }
    if (uploadedUrls.length > 0) {
      handleInputChange("images", [...formData.images, ...uploadedUrls]);
    }
  };

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {editingProduct ? "Edit Product" : "Create New Product"}
          </h2>
          <p className="text-green-300 mt-2 text-sm sm:text-base">
            {editingProduct
              ? "Update product information"
              : "Add a new product to your catalog"}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onClearEdit}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors text-sm sm:text-base"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Basic Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      errors.name
                        ? "border-red-500"
                        : "border-green-500/30 focus:border-green-400"
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      errors.description
                        ? "border-red-500"
                        : "border-green-500/30 focus:border-green-400"
                    }`}
                    placeholder="Enter product description"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Price (NGN) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-2 sm:py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                          errors.price
                            ? "border-red-500"
                            : "border-green-500/30 focus:border-green-400"
                        }`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Original Price (NGN)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          handleInputChange("originalPrice", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                        errors.category
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Subcategory
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) =>
                        handleInputChange("subcategory", e.target.value)
                      }
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                    >
                      <option value="">Select subcategory</option>
                      {formData.category &&
                        subcategories[
                          formData.category as keyof typeof subcategories
                        ]?.map((subcategory) => (
                          <option key={subcategory} value={subcategory}>
                            {subcategory}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                      placeholder="Enter brand name"
                    />
                  </div>

                  {/* Removed SKU field */}
                </div>

                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      errors.slug
                        ? "border-red-500"
                        : "border-green-500/30 focus:border-green-400"
                    }`}
                    placeholder="product-slug"
                  />
                  {errors.slug && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.slug}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Inventory & Stock
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={
                        formData.stockQuantity === 0
                          ? ""
                          : formData.stockQuantity
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        handleInputChange(
                          "stockQuantity",
                          val === "" ? 0 : parseInt(val)
                        );
                      }}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                      Min Stock Level
                    </label>
                    <input
                      type="number"
                      value={
                        formData.minStockLevel === 0
                          ? ""
                          : formData.minStockLevel
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        handleInputChange(
                          "minStockLevel",
                          val === "" ? 0 : parseInt(val)
                        );
                      }}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                      placeholder="5"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">In Stock</p>
                    <p className="text-green-300 text-xs sm:text-sm">
                      Product is available for purchase
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("inStock", !formData.inStock)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.inStock ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.inStock ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Features
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400"
                    placeholder="Add a feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20"
                    >
                      <span className="text-white">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-1 hover:bg-red-500/20 rounded-lg text-red-300 hover:text-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Images *
              </h3>

              <div className="space-y-4">
                {/* Cloudinary file upload */}
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleCloudinaryUpload(e.target.files)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
                  />
                  <span className="text-green-300 text-xs">Upload images</span>
                </div>
                {/* Manual URL input (fallback) */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addImage())
                    }
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400"
                    placeholder="Add image URL"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20"
                    >
                      <span className="text-white truncate">{image}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-1 hover:bg-red-500/20 rounded-lg text-red-300 hover:text-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.images && (
                  <p className="text-red-400 text-xs sm:text-sm">{errors.images}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                    >
                      <span className="text-green-300 text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:bg-red-500/20 rounded-full p-1 text-red-300 hover:text-red-100 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                SEO & Meta
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      handleInputChange("metaTitle", e.target.value)
                    }
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) =>
                      handleInputChange("metaDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                    placeholder="SEO description for search engines"
                  />
                </div>

                <div>
                  <label className="block text-green-300 text-xs sm:text-sm font-medium mb-2">
                    Keywords
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addKeyword())
                      }
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400"
                      placeholder="Add a keyword"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.keywords.map((keyword: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                      >
                        <span className="text-green-300 text-sm">
                          {keyword}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(index)}
                          className="hover:bg-red-500/20 rounded-full p-1 text-red-300 hover:text-red-100 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Publishing Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Published</p>
                    <p className="text-green-300 text-xs sm:text-sm">
                      Make this product visible to customers
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("isPublished", !formData.isPublished)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isPublished ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isPublished ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Featured Product</p>
                    <p className="text-green-300 text-xs sm:text-sm">
                      Show this product prominently
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("isFeatured", !formData.isFeatured)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isFeatured ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isFeatured ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">On Sale</p>
                    <p className="text-green-300 text-xs sm:text-sm">
                      Mark this product as discounted
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("isOnSale", !formData.isOnSale)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isOnSale ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isOnSale ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Best Selling</p>
                    <p className="text-green-300 text-xs sm:text-sm">
                      Mark this product as a best seller
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("bestSelling", !formData.bestSelling)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.bestSelling ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.bestSelling ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-green-500/20 gap-4 sm:gap-0">
          <div className="text-green-300 text-xs sm:text-sm">
            {editingProduct
              ? "Update your product information"
              : "Create a new product for your catalog"}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClearEdit}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingProduct ? "Update Product" : "Create Product"}
                </>
              )}
            </button>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400">{errors.submit}</p>
          </div>
        )}
      </form>
    </div>
  );
}
