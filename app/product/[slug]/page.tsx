import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({ }: { params: { slug: string } }) {
  // In a real app, you would fetch the product data based on the slug
  const product = {
    id: 1,
    name: "Smart Poultry Monitoring System",
    slug: "smart-poultry-monitoring-system",
    description:
      "Complete monitoring solution for temperature, humidity, feed levels, and more with smartphone connectivity.",
    longDescription:
      "The Smart Poultry Monitoring System is a comprehensive solution designed to revolutionize how you manage your poultry farm. This advanced system continuously monitors critical environmental factors including temperature, humidity, ammonia levels, and feed/water consumption in real-time. All data is accessible through our intuitive smartphone app, allowing you to make informed decisions from anywhere. The system includes wireless sensors, a central hub, and a 12-month subscription to our cloud platform. Receive instant alerts when conditions fall outside optimal ranges, view historical data to identify trends, and optimize your farm's efficiency with data-driven insights. Compatible with farms of all sizes, this system can be expanded with additional sensors as your operation grows.",
    price: 599.99,
    originalPrice: 699.99,
    discount: 14,
    image: "/placeholder.svg?height=600&width=600",
    gallery: [
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    ],
    features: [
      "Real-time monitoring of temperature, humidity, and ammonia levels",
      "Feed and water level tracking with automatic alerts",
      "Smartphone app for iOS and Android",
      "Historical data analysis and reporting",
      "Expandable with additional sensors",
      "Battery backup with 48-hour runtime",
      "Easy installation with wireless sensors",
      "Cloud storage with secure data encryption",
    ],
    specifications: [
      { name: "Dimensions", value: "Hub: 15 x 10 x 5 cm, Sensors: 8 x 5 x 3 cm" },
      { name: "Power", value: "110-240V AC, with rechargeable battery backup" },
      { name: "Connectivity", value: "Wi-Fi, Bluetooth, 4G LTE (optional)" },
      { name: "Sensor Range", value: "Up to 100 meters from hub" },
      { name: "Temperature Range", value: "-10°C to 60°C (±0.5°C accuracy)" },
      { name: "Humidity Range", value: "0-100% RH (±2% accuracy)" },
      { name: "App Compatibility", value: "iOS 12+ and Android 8+" },
      { name: "Warranty", value: "2 years with extended warranty available" },
    ],
    stock: 15,
    reviews: {
      average: 4.8,
      count: 36,
      breakdown: [
        { stars: 5, percentage: 85 },
        { stars: 4, percentage: 10 },
        { stars: 3, percentage: 3 },
        { stars: 2, percentage: 1 },
        { stars: 1, percentage: 1 },
      ],
    },
    categoryId: 6,
    categoryName: "Monitoring Systems",
    categorySlug: "monitoring-systems",
    brand: "FarmTech",
    isNew: true,
    relatedProducts: [2, 5, 7],
    tags: ["smart farm", "monitoring", "automation", "IoT"],
  }

  // In a real app, you would fetch related products based on the product's relatedProducts array
  const relatedProducts = [
    {
      id: 2,
      name: "Environmental Controller",
      slug: "environmental-controller",
      description:
        "Automated control of ventilation, heating, and cooling systems for optimal poultry house conditions.",
      price: 799.99,
      image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 5,
      name: "Feed Level Sensor",
      slug: "feed-level-sensor",
      description: "Wireless sensor that monitors feed levels in bins and silos. Sends alerts when levels are low.",
      price: 129.99,
      image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 7,
      name: "Water Quality Monitor",
      slug: "water-quality-monitor",
      description: "Continuous monitoring of water quality parameters including pH, temperature, and contaminants.",
      price: 249.99,
      image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 9,
      name: "Poultry Scale System",
      slug: "poultry-scale-system",
      description: "Automated weighing system for tracking bird growth and performance metrics.",
      price: 399.99,
      image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-6 md:py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
        <Link href="/categories" className="text-muted-foreground hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
        <Link href={`/categories/${product.categorySlug}`} className="text-muted-foreground hover:text-foreground">
          {product.categoryName}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
        <span className="font-medium text-primary truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border border-secondary rounded-lg overflow-hidden relative">
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-4 right-4 z-10 bg-green-600 text-white text-sm font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.gallery.map((image, index) => (
              <div
                key={index}
                className="border border-secondary rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-secondary/50">
                {product.brand}
              </Badge>
              <Badge variant="secondary">{product.categoryName}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.reviews.average) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.reviews.average} ({product.reviews.count} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
            {product.discount > 0 && (
              <div className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="rounded-r-none">
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="px-4 py-2">1</div>
              <Button variant="ghost" size="icon" className="rounded-l-none">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-primary" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
              <span>2-year warranty included</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-secondary/50">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-10 md:mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features & Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 md:p-6 border rounded-b-lg">
            <p className="whitespace-pre-line text-sm md:text-base">{product.longDescription}</p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="bg-accent rounded-lg p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Key Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm md:text-base">
                      Reduce mortality rates by up to 20% through early detection of environmental issues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm md:text-base">
                      Improve feed conversion ratios with optimal environmental conditions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm md:text-base">
                      Save labor costs with remote monitoring and automated alerts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm md:text-base">
                      Increase overall productivity with data-driven decision making
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <Image
                  src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"
                  alt="Product in use"
                  width={500}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  The Smart Poultry Monitoring System installed in a commercial poultry house, showing the central hub
                  and multiple sensors.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features" className="p-4 md:p-6 border rounded-b-lg">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 py-2 border-b last:border-0">
                      <div className="font-medium text-sm md:text-base">{spec.name}</div>
                      <div className="text-sm md:text-base">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-8 p-4 bg-accent rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">What&apos;s in the Box</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">1 x Central Hub Unit</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">4 x Temperature/Humidity Sensors</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">2 x Feed Level Sensors</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">2 x Water Flow Sensors</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">1 x Ammonia Sensor</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">Power Adapter & Mounting Hardware</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">User Manual & Quick Start Guide</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm md:text-base">12-Month Cloud Subscription</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 md:p-6 border rounded-b-lg">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="md:w-1/3">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary">{product.reviews.average}</div>
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.reviews.average) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Based on {product.reviews.count} reviews</div>
                  </div>
                  <div className="mt-6 space-y-2">
                    {product.reviews.breakdown.map((item) => (
                      <div key={item.stars} className="flex items-center">
                        <div className="w-12 text-sm">{item.stars} stars</div>
                        <div className="w-full mx-4 h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-right">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">Write a Review</Button>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="border border-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Michael T.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Verified Purchase - March 15, 2023</div>
                      <p className="mt-2 text-sm md:text-base">
                        This monitoring system has completely transformed how I manage my poultry farm. The real-time
                        alerts have saved me from potential disasters multiple times, and the data insights have helped
                        me optimize my operation. Installation was straightforward, and the customer support team was
                        very helpful when I had questions about setting up the app. Highly recommended for any serious
                        poultry farmer!
                      </p>
                    </div>
                    <div className="border border-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Sarah L.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Verified Purchase - January 8, 2023</div>
                      <p className="mt-2 text-sm md:text-base">
                        Great system overall. The sensors are accurate and the app is intuitive. Taking off one star
                        because the battery life isn&apos;t quite as long as advertised, but it&apos;s still a solid product that
                        has improved our farm management significantly.
                      </p>
                    </div>
                    <div className="border border-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Robert J.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Verified Purchase - November 20, 2022</div>
                      <p className="mt-2 text-sm md:text-base">
                        We&apos;ve been using this system for about 6 months now on our commercial farm with 15,000 birds.
                        The ROI has been incredible - we&apos;ve reduced mortality by 15% and improved feed conversion
                        ratios. The historical data analysis has been particularly valuable for optimizing our
                        operations.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="p-4 md:p-6 border rounded-b-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">How difficult is the system to install?</h3>
                <p className="text-sm md:text-base">
                  The Smart Poultry Monitoring System is designed for easy installation. The sensors are wireless and
                  battery-powered, so there&#39;s no complex wiring required. Most customers can complete the installation
                  in 1-2 hours following our step-by-step guide. Our customer support team is also available to assist
                  with installation if needed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">What is the range of the wireless sensors?</h3>
                <p className="text-sm md:text-base">
                  The sensors can communicate with the hub from up to 100 meters away in typical farm conditions. For
                  larger operations, multiple hubs can be networked together to cover more area. The system will
                  automatically alert you if any sensor loses connection with the hub.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  How long does the battery last in the sensors?
                </h3>
                <p className="text-sm md:text-base">
                  With normal use, the sensor batteries typically last 6-8 months before needing replacement. The app
                  will notify you when battery levels are getting low, giving you plenty of time to replace them. The
                  hub itself is powered by AC with a battery backup that lasts up to 48 hours in case of power outages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Can I add more sensors to the system later?</h3>
                <p className="text-sm md:text-base">
                  Yes, the system is fully expandable. Additional sensors can be purchased separately and easily paired
                  with your existing hub. The base system supports up to 32 sensors per hub, which is sufficient for
                  most operations. For larger farms, multiple hubs can be networked together.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  What happens after the 12-month cloud subscription ends?
                </h3>
                <p className="text-sm md:text-base">
                  After the included 12-month subscription ends, you can renew at our standard rate of $9.99/month or
                  $99/year. The subscription includes cloud storage of all your data, remote access via the app, and
                  software updates. Without a subscription, the system will continue to function locally, but you&#39;ll
                  lose remote access and historical data storage beyond 30 days.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl font-bold mb-6 text-primary">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-secondary hover:border-primary">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button size="sm" variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

