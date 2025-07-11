"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = [
    {
      id: 1,
      name: "John Deere 5075E Tractor",
      price: "₦15,500,000",
      originalPrice: "₦17,000,000",
      image: "/placeholder.svg?height=250&width=250",
      badge: "Popular",
      badgeColor: "bg-green-500",
    },
    {
      id: 2,
      name: "Massey Ferguson 385 4WD",
      price: "Request Quote",
      image: "/placeholder.svg?height=250&width=250",
      badge: "New Arrival",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Boom Sprayer 600L",
      price: "₦850,000",
      originalPrice: "₦950,000",
      image: "/placeholder.svg?height=250&width=250",
      badge: "Sale",
      badgeColor: "bg-red-500",
    },
    {
      id: 4,
      name: "CAT 320D Excavator",
      price: "Request Quote",
      image: "/placeholder.svg?height=250&width=250",
      badge: "Featured",
      badgeColor: "bg-orange-500",
    },
    {
      id: 5,
      name: "Feed Mixer 2000L",
      price: "₦1,200,000",
      image: "/placeholder.svg?height=250&width=250",
      badge: "Best Seller",
      badgeColor: "bg-purple-500",
    },
    {
      id: 6,
      name: "Irrigation System Kit",
      price: "₦450,000",
      image: "/placeholder.svg?height=250&width=250",
      badge: "Eco-Friendly",
      badgeColor: "bg-green-600",
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

  const maxIndex = Math.max(0, products.length - itemsToShow)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className={`flex-shrink-0 px-2`} style={{ width: `${100 / itemsToShow}%` }}>
              <div className="card relative group">
                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium z-10`}
                >
                  {product.badge}
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
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
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
              index === currentIndex ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
