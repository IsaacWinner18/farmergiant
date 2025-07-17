"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../contexts/product-context";
import { useCart } from "@/components/cartContext";

export default function BestSellingCarousel() {
  const { products, loading, error } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  // Filter best selling products
  const bestSellers = products.filter((p) => p.bestSelling);

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerPage.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerPage.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerPage.tablet);
      } else {
        setItemsToShow(itemsPerPage.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, bestSellers.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading best sellers...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }
  if (!bestSellers.length) {
    return (
      <div className="flex justify-center items-center h-64">
        No best selling products found.
      </div>
    );
  }

  // Handle single product: center and hide nav/dots
  if (bestSellers.length === 1) {
    const product = bestSellers[0];
    return (
      <div className="flex justify-center items-center h-64">
        <div className="card relative group border-2 border-transparent hover:border-yellow-400 transition-all duration-300 max-w-xs w-full mx-auto">
          {/* Best Seller Badge */}
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            {product.bestSelling ? "Best Seller" : "Popular"}
          </div>
          <div className="relative overflow-hidden rounded-lg mb-4">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              width={250}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <Link
                  href={`/product/${product.slug || product._id}`}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    addToCart(product, ({ type }) => {
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
                    });
                  }}
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {product.rating && (
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount || 0})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-green-600">
                ₦{product.price?.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₦{product.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/product/${product.slug || product._id}`}
                className="btn-secondary flex-1 text-center py-2 text-sm"
              >
                View Details
              </Link>
              <button
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
                className="btn-primary px-4 py-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {bestSellers.map((product) => (
            <div
              key={product._id}
              className={`flex-shrink-0 px-2`}
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div className="card relative group border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                {/* Best Seller Badge */}
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {product.bestSelling ? "Best Seller" : "Popular"}
                </div>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Link
                        href={`/product/${product.slug || product._id}`}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
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
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {product.rating && (
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount || 0})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-green-600">
                      ₦{product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₦{product.originalPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/product/${product.slug || product._id}`}
                      className="btn-secondary flex-1 text-center py-2 text-sm"
                    >
                      View Details
                    </Link>
                    <button
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
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-yellow-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
