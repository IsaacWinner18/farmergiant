"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Eye, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BestSellingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const bestSellers = [
    {
      id: 1,
      name: "Massey Ferguson 375",
      price: "₦12,500,000",
      originalPrice: "₦14,000,000",
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.8,
      reviews: 124,
      soldCount: "500+ Sold",
      badge: "#1 Best Seller",
    },
    {
      id: 2,
      name: "Honda Water Pump WB30XT",
      price: "₦185,000",
      originalPrice: "₦220,000",
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.9,
      reviews: 89,
      soldCount: "300+ Sold",
      badge: "Top Rated",
    },
    {
      id: 3,
      name: "Knapsack Sprayer 20L",
      price: "₦45,000",
      originalPrice: "₦55,000",
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.7,
      reviews: 256,
      soldCount: "1000+ Sold",
      badge: "Most Popular",
    },
    {
      id: 4,
      name: "Solar Water Pump System",
      price: "₦320,000",
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.6,
      reviews: 67,
      soldCount: "150+ Sold",
      badge: "Eco Choice",
    },
    {
      id: 5,
      name: "Disc Harrow 24 Disc",
      price: "₦850,000",
      originalPrice: "₦950,000",
      image: "/placeholder.svg?height=250&width=250",
      rating: 4.8,
      reviews: 43,
      soldCount: "200+ Sold",
      badge: "Great Value",
    },
  ]

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const [itemsToShow, setItemsToShow] = useState(itemsPerPage.desktop)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerPage.mobile)
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerPage.tablet)
      } else {
        setItemsToShow(itemsPerPage.desktop)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, bestSellers.length - itemsToShow)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {bestSellers.map((product) => (
            <div key={product.id} className={`flex-shrink-0 px-2`} style={{ width: `${100 / itemsToShow}%` }}>
              <div className="card relative group border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                {/* Best Seller Badge */}
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {product.badge}
                </div>

                {/* Sold Count */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                  {product.soldCount}
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-green-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`} className="btn-secondary flex-1 text-center py-2 text-sm">
                      View Details
                    </Link>
                    <button
                      onClick={() => {
                        // Add to cart logic here
                        console.log(`Added ${product.name} to cart`)

                        // Trigger notification
                        if (typeof window !== "undefined" && (window as any).addCartNotification) {
                          ;(window as any).addCartNotification(product.name, product.id.toString(), product.image)
                        }
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
  )
}
