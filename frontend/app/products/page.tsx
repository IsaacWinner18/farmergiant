"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import WhatsAppFloat from "@/components/whatsapp-float";
import { Filter, Grid, List, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/contexts/product-context";
import { useCart } from "@/components/cartContext";

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Derive categories from products, fallback to static if empty
  const staticCategories = [
    { value: "all", label: "All Products" },
    { value: "tractors", label: "Tractors" },
    { value: "sprayers", label: "Sprayers & Irrigation" },
    { value: "earth-movers", label: "Earth Movers" },
    { value: "livestock", label: "Livestock Equipment" },
  ];
  const categories = products.length
    ? [
        { value: "all", label: "All Products" },
        ...Array.from(new Set(products.map((p) => p.category))).map((cat) => ({
          value: cat,
          label: cat
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        })),
      ]
    : staticCategories;

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Farm Equipment & Machinery
          </h1>
          <p className="text-lg text-gray-600">
            Browse our comprehensive range of agricultural equipment
          </p>
        </div>
        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Loading/Error States */}
        {loading ? (
          <div className="text-center py-16 text-lg text-gray-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 font-semibold">
            {error}
          </div>
        ) : (
          <>
            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-16">
                  No products found.
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`card ${
                      viewMode === "list"
                        ? "flex flex-col md:flex-row gap-6"
                        : ""
                    }`}
                  >
                    <div
                      className={
                        viewMode === "list"
                          ? "w-full md:w-48 flex-shrink-0"
                          : ""
                      }
                    >
                      <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      {/* Optionally show slug or other info here */}
                      <div className="text-gray-600 mb-3">
                        {product.category && (
                          <span className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded text-xs mr-2 mb-1">
                            {product.category
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="inline-block bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs mr-2 mb-1">
                            Featured
                          </span>
                        )}
                        {product.isOnSale && (
                          <span className="inline-block bg-red-50 text-red-700 px-2 py-1 rounded text-xs mr-2 mb-1">
                            On Sale
                          </span>
                        )}
                        {product.bestSelling && (
                          <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-2 mb-1">
                            Best Seller
                          </span>
                        )}
                      </div>
                      {/* Description (optional, if available) */}
                      {/* <p className="text-gray-600 mb-3">{product.description}</p> */}
                      {/* Features (if available) */}
                      {/* <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {product.features?.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div> */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                        <div className="text-md md:text-2xl font-bold text-green-600 mb-2 sm:mb-0">
                          {product.currency || "₦"}
                          {typeof product.price === "number"
                            ? product.price.toLocaleString()
                            : product.price}
                        </div>
                        <div className="flex flex-col w-full sm:flex-row sm:w-auto gap-2 sm:gap-4">
                          <Link
                            href={`/product/${product.slug || product._id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                            aria-label={`View details for ${product.name}`}
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </Link>
                          <button
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                            aria-label={`Add ${product.name} to cart`}
                            onClick={() => {
                              addToCart(
                                product,
                                ({ type }: { type: "added" | "duplicate" }) => {
                                  if (
                                    typeof window !== "undefined" &&
                                    (window as any).addCartNotification
                                  ) {
                                    (window as any).addCartNotification(
                                      product.name,
                                      product._id,
                                      product.images?.[0] || "",
                                      type === "duplicate"
                                        ? "Product is already in your cart."
                                        : "Added to cart successfully!"
                                    );
                                  }
                                }
                              );
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Load More Button (optional, only if pagination is implemented) */}
            {/* <div className="text-center mt-12">
              <button className="btn-secondary px-8 py-3">Load More Products</button>
            </div> */}
          </>
        )}
      </div>
      <Footer />
      <MobileNav />
      <WhatsAppFloat />
    </div>
  );
}
