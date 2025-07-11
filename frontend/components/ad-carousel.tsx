"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const ads = [
    {
      id: 1,
      title: "New Holland T6.180",
      subtitle: "Premium Tractor Series",
      description: "180HP of pure power for large-scale farming operations",
      price: "₦28,500,000",
      originalPrice: "₦32,000,000",
      image: "/placeholder.svg?height=300&width=400",
      ctaText: "Order Now",
      ctaLink: "/product/1",
      bgGradient: "from-blue-600 to-blue-800",
    },
    {
      id: 2,
      title: "Kubota Combine Harvester",
      subtitle: "Harvest Season Special",
      description: "Complete your harvest faster with 40% efficiency boost",
      price: "Request Quote",
      image: "/placeholder.svg?height=300&width=400",
      ctaText: "Get Quote",
      ctaLink: "/quote",
      bgGradient: "from-green-600 to-green-800",
    },
    {
      id: 3,
      title: "JCB Backhoe Loader",
      subtitle: "Construction & Farming",
      description: "Versatile machine for digging, loading, and construction work",
      price: "₦18,200,000",
      originalPrice: "₦20,500,000",
      image: "/placeholder.svg?height=300&width=400",
      ctaText: "Order Now",
      ctaLink: "/product/3",
      bgGradient: "from-orange-600 to-orange-800",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full">
      <div className="overflow-hidden rounded-xl h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad) => (
            <div key={ad.id} className="flex-shrink-0 w-full h-full">
              <div
                className={`relative bg-gradient-to-br ${ad.bgGradient} text-white rounded-xl overflow-hidden h-full min-h-[400px] lg:min-h-[500px]`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium opacity-90 mb-2">{ad.subtitle}</div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{ad.title}</h3>
                    <p className="text-lg opacity-90 mb-6 leading-relaxed">{ad.description}</p>
                  </div>

                  <div>
                    <div className="mb-6">
                      <div className="text-2xl lg:text-3xl font-bold">{ad.price}</div>
                      {ad.originalPrice && <div className="text-lg opacity-75 line-through">{ad.originalPrice}</div>}
                    </div>

                    <Link
                      href={ad.ctaLink}
                      className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      {ad.ctaText}
                    </Link>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-opacity-30 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-opacity-30 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
