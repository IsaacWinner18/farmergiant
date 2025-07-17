"use client";

import { useState, use } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import WhatsAppFloat from "@/components/whatsapp-float";
import {
  ShoppingCart,
  MessageCircle,
  Heart,
  Share2,
  ZoomIn,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/contexts/product-context";
import { useCart } from "@/components/cartContext";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Find product by slug (or fallback to _id)
  const product = products.find((p) => p.slug === id || p._id === id);

  // Dynamically select up to 3 related products, excluding the current product
  const relatedProducts = products
    .filter((p) => p.slug !== id && p._id !== id)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-lg text-gray-500 py-32">Loading product...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-lg text-red-600 py-32">{error}</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-lg text-gray-500 py-32">Product not found.</div>
        <Footer />
      </div>
    );
  }

  // Fallbacks for optional fields
  const features = product.features || [];
  const specifications = product.specifications || {};
  const inStock = product.inStock !== undefined ? product.inStock : true;
  const rating = product.rating !== undefined ? product.rating : 4.5;
  const reviews = product.reviewCount !== undefined ? product.reviewCount : 0;
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder.svg"];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-green-600">
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/products?category=tractors"
                className="hover:text-green-600"
              >
                Tractors
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={470}
                height={470}
                className="w-full h-96 object-cover rounded-lg"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                onClick={() => setIsZoomOpen(true)}
                aria-label="Zoom image"
              >
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {rating} ({reviews} reviews)
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-green-600">
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {typeof product.originalPrice === "number"
                      ? product.originalPrice.toLocaleString()
                      : product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    addToCart(
                      { ...product, quantity },
                      ({ type }: { type: "added" | "duplicate" }) => {
                        if (
                          typeof window !== "undefined" &&
                          (window as any).addCartNotification
                        ) {
                          (window as any).addCartNotification(
                            product.name,
                            product._id,
                            images[0],
                            type === "duplicate"
                              ? "Product is already in your cart."
                              : "Added to cart successfully!"
                          );
                        }
                      }
                    );
                  }}
                  className="btn-primary flex items-center justify-center gap-2 flex-1"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <Link
                  href="/quote"
                  className="btn-secondary flex items-center justify-center gap-2 flex-1"
                >
                  Request Quote
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* WhatsApp Inquiry */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">
                Need More Information?
              </h3>
              <p className="text-green-700 text-sm mb-3">
                Chat with our agricultural equipment specialists on WhatsApp
              </p>
              <a
                href={`https://wa.me/2348031234567?text=Hi, I'm interested in the ${product.name}. Can you provide more details?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-green-500 text-green-600 font-medium">
                Features
              </button>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Specifications
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id || relatedProduct.slug}
                href={`/product/${relatedProduct.slug || relatedProduct._id}`}
                className="card group"
              >
                <Image
                  src={
                    relatedProduct.images && relatedProduct.images.length > 0
                      ? relatedProduct.images[0]
                      : "/placeholder.svg"
                  }
                  alt={relatedProduct.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                  {relatedProduct.name}
                </h3>
                <p className="text-xl font-bold text-green-600">
                  {typeof relatedProduct.price === "number"
                    ? relatedProduct.price.toLocaleString()
                    : relatedProduct.price}
                  {relatedProduct.originalPrice && (
                    <span className="text-base text-gray-500 line-through ml-2">
                      {typeof relatedProduct.originalPrice === "number"
                        ? relatedProduct.originalPrice.toLocaleString()
                        : relatedProduct.originalPrice}
                    </span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
      <WhatsAppFloat />

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative max-w-xl w-full p-4  my-5">
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:shadow-lg"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close zoom"
            >
              <span className="text-xl">&times;</span>
            </button>
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={700}
              height={700}
              className="w-full h-auto object-contain rounded-lg bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
