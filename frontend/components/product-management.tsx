"use client";

import * as React from "react";
import {
  Edit,
  Eye,
  Search,
  DollarSign,
  ArrowLeft,
  Plus,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { CreateProduct } from "./create-product";

interface ProductManagementProps {
  onEditProduct?: (product: any) => void;
  onProductSaved?: () => void;
}

export function ProductManagement({
  onEditProduct,
  onProductSaved,
}: ProductManagementProps) {
  const [products, setProducts] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(
    null
  );
  const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [analytics, setAnalytics] = React.useState<any | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = React.useState(false);
  const [analyticsError, setAnalyticsError] = React.useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/read/products`,
        {
          credentials: "include", // Include cookies for authentication
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (error: any) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch analytics for selected product when analytics tab is active
  React.useEffect(() => {
    const fetchAnalytics = async () => {
      if (!selectedProduct || activeTab !== "analytics") return;
      setAnalyticsLoading(true);
      setAnalyticsError("");
      setAnalytics(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/analytics/product/${selectedProduct.slug}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch analytics");
        }
        setAnalytics(data.data.summary);
      } catch (error: any) {
        setAnalyticsError(error.message || "Failed to fetch analytics");
      } finally {
        setAnalyticsLoading(false);
      }
    };
    fetchAnalytics();
  }, [selectedProduct, activeTab]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const togglePublished = async (productId: string) => {
    try {
      const product = products.find((p) => p._id === productId);
      if (!product) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/update/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({
            isPublished: !product.isPublished,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      // Update local state
      setProducts(
        products.map((product) =>
          product._id === productId
            ? { ...product, isPublished: !product.isPublished }
            : product
        )
      );

      if (selectedProduct && selectedProduct._id === productId) {
        setSelectedProduct({
          ...selectedProduct,
          isPublished: !selectedProduct.isPublished,
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to update product");
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowCreateForm(true);
  };

  const handleClearEdit = () => {
    setEditingProduct(null);
    setShowCreateForm(false);
  };

  const handleProductSaved = () => {
    fetchProducts();
    setEditingProduct(null);
    setShowCreateForm(false);
    onProductSaved?.();
  };

  // Show create/edit form
  if (showCreateForm) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleClearEdit}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h3 className="text-2xl font-bold text-white">
            {editingProduct ? "Edit Product" : "Create New Product"}
          </h3>
        </div>

        <CreateProduct
          editingProduct={editingProduct}
          onClearEdit={handleClearEdit}
          onProductSaved={handleProductSaved}
        />
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedProduct(null)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h3 className="text-2xl font-bold text-white">
            {selectedProduct.name}
          </h3>
        </div>

        {/* Product Details */}
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl border border-green-500/20 shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="p-6 border-b border-green-500/20">
            <div className="flex gap-1 bg-green-900/30 rounded-xl p-1">
              {["overview", "features", "details", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg"
                      : "text-green-300 hover:text-white hover:bg-green-500/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
                    <h4 className="text-white font-semibold mb-4">
                      Basic Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-300">Slug:</span>
                        <span className="text-white">
                          {selectedProduct.slug}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Category:</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg text-sm">
                          {selectedProduct.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Price:</span>
                        <span className="text-white font-bold">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Original Price:</span>
                        <span className="text-green-400 line-through">
                          {formatPrice(selectedProduct.upPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Status:</span>
                        <button
                          onClick={() => togglePublished(selectedProduct._id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedProduct.isPublished
                              ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                          }`}
                        >
                          {selectedProduct.isPublished
                            ? "Available"
                            : "Unpublished"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
                    <h4 className="text-white font-semibold mb-4">
                      Description
                    </h4>
                    <p className="text-green-200 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4">
                      Preview Image
                    </h4>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-green-500/20">
                      <Image
                        src={selectedProduct.image || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h4 className="text-white font-semibold mb-6">Features</h4>
                  <div className="space-y-3">
                    {selectedProduct.features?.map(
                      (feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-green-900/30 rounded-xl border border-green-500/20"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-green-200">{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-6">
                    Key Features
                  </h4>
                  <div className="space-y-4">
                    {selectedProduct.keyFeatures?.map(
                      (feature: any, index: number) => (
                        <div
                          key={index}
                          className="bg-green-900/30 rounded-xl p-6 border border-green-500/20"
                        >
                          <h5 className="text-white font-medium mb-3">
                            {feature.title}
                          </h5>
                          <p className="text-green-200 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div>
                <h4 className="text-white font-semibold mb-6">
                  Technical Details
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                  {selectedProduct.details?.map(
                    (detail: any, index: number) => (
                      <div
                        key={index}
                        className="bg-green-900/30 rounded-xl p-6 border border-green-500/20"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-white/20 rounded" />
                          </div>
                          <span className="text-white font-medium">
                            {detail.label}
                          </span>
                        </div>
                        <p className="text-green-200 text-sm">{detail.value}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">Views</span>
                  </div>
                  <p className="text-3xl font-bold text-white">-</p>
                  <p className="text-green-400 text-xs mt-2">(Not tracked)</p>
                </div>

                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">Sales</span>
                  </div>
                  {analyticsLoading ? (
                    <p className="text-green-300">Loading...</p>
                  ) : analyticsError ? (
                    <p className="text-red-400">{analyticsError}</p>
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {analytics?.totalSales ?? 0}
                    </p>
                  )}
                </div>

                <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">Revenue</span>
                  </div>
                  {analyticsLoading ? (
                    <p className="text-green-300">Loading...</p>
                  ) : analyticsError ? (
                    <p className="text-red-400">{analyticsError}</p>
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {formatPrice(analytics?.totalRevenue ?? 0)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Template Management</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-12 pr-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Template
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-400" />
        </div>
      )}

      {/* Templates Grid */}
      {!isLoading && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-green-300 text-lg">No templates found</p>
              <p className="text-green-400 text-sm mt-2">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first template to get started"}
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl border border-green-500/20 shadow-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-sm rounded-full border border-green-400/50">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 backdrop-blur-sm text-white text-sm rounded-full border ${
                        product.isPublished
                          ? "bg-green-500/80 border-green-400/50"
                          : "bg-red-500/80 border-red-400/50"
                      }`}
                    >
                      {product.isPublished ? "Available" : "Unpublished"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-green-200 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-green-400 text-sm line-through">
                        {formatPrice(product.upPrice)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-300 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
