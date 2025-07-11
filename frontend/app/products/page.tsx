"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MobileNav from "@/components/layout/mobile-nav"
import WhatsAppFloat from "@/components/whatsapp-float"
import { Filter, Grid, List, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: 1,
      name: "John Deere 5075E Tractor",
      price: "₦15,500,000",
      image: "/placeholder.svg?height=300&width=300",
      category: "tractors",
      description: "75HP utility tractor perfect for medium-scale farming operations",
      features: ["75 HP Engine", "4WD", "Power Steering", "12F/12R Transmission"],
    },
    {
      id: 2,
      name: "Massey Ferguson 385 4WD",
      price: "Request Quote",
      image: "/placeholder.svg?height=300&width=300",
      category: "tractors",
      description: "Reliable 85HP tractor with excellent fuel efficiency",
      features: ["85 HP Engine", "4WD", "Hydraulic Lift", "PTO"],
    },
    {
      id: 3,
      name: "Boom Sprayer 600L",
      price: "₦850,000",
      image: "/placeholder.svg?height=300&width=300",
      category: "sprayers",
      description: "High-capacity boom sprayer for large field applications",
      features: ["600L Tank", "12m Boom Width", "Adjustable Nozzles", "PTO Driven"],
    },
    {
      id: 4,
      name: "CAT 320D Excavator",
      price: "Request Quote",
      image: "/placeholder.svg?height=300&width=300",
      category: "earth-movers",
      description: "Heavy-duty excavator for construction and earth moving",
      features: ["20 Ton Weight", "Hydraulic System", "AC Cabin", "Long Reach"],
    },
    {
      id: 5,
      name: "Feed Mixer 2000L",
      price: "₦1,200,000",
      image: "/placeholder.svg?height=300&width=300",
      category: "livestock",
      description: "Vertical feed mixer for cattle and livestock feeding",
      features: ["2000L Capacity", "Stainless Steel", "PTO Driven", "Easy Loading"],
    },
    {
      id: 6,
      name: "Irrigation System Kit",
      price: "₦450,000",
      image: "/placeholder.svg?height=300&width=300",
      category: "sprayers",
      description: "Complete drip irrigation system for 1 hectare",
      features: ["1 Hectare Coverage", "Timer Control", "Pressure Regulator", "Easy Install"],
    },
  ]

  const categories = [
    { value: "all", label: "All Products" },
    { value: "tractors", label: "Tractors" },
    { value: "sprayers", label: "Sprayers & Irrigation" },
    { value: "earth-movers", label: "Earth Movers" },
    { value: "livestock", label: "Livestock Equipment" },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Farm Equipment & Machinery</h1>
          <p className="text-lg text-gray-600">Browse our comprehensive range of agricultural equipment</p>
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
              className={`p-2 rounded ${viewMode === "grid" ? "bg-green-100 text-green-600" : "text-gray-600"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-green-100 text-green-600" : "text-gray-600"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`card ${viewMode === "list" ? "flex gap-6" : ""}`}>
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">{product.price}</div>
                  <div className="flex gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary px-8 py-3">Load More Products</button>
        </div>
      </div>

      <Footer />
      <MobileNav />
      <WhatsAppFloat />
    </div>
  )
}
