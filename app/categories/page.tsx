import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoriesPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Product Categories</h1>
        <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
          Browse our comprehensive range of poultry equipment categories to find exactly what you need for your farm
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg h-full border-secondary hover:border-primary">
              <div className="aspect-video relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-sm font-medium py-1 px-2 rounded-full">
                  {category.productCount} Products
                </div>
              </div>
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.name}</h2>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">{category.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Category
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Category */}
      <div className="mt-12 md:mt-16 bg-accent rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 md:p-12 flex flex-col justify-center">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured Category
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Smart Poultry Monitoring Systems</h2>
            <p className="text-muted-foreground mb-6">
              Revolutionize your poultry farm with our cutting-edge monitoring systems. Track temperature, humidity,
              feed levels, and more in real-time from your smartphone or computer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories/monitoring-systems">
                <Button>Explore Systems</Button>
              </Link>
              <Link href="/products?category=monitoring-systems">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>
          </div>
          <div className="relative min-h-[250px] md:min-h-full order-first md:order-last">
            <Image
              src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"
              alt="Smart Poultry Monitoring Systems"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Category Benefits */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-10 text-primary">Why Shop by Category?</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center p-4">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-sm md:text-base">Specialized Solutions</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              Find equipment tailored to specific poultry farming needs
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-sm md:text-base">Quality Guaranteed</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              Each category features rigorously tested equipment
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-sm md:text-base">Easy Comparison</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Compare similar products within each category</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-sm md:text-base">Complete Systems</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              Find all components needed for a complete solution
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const categories = [
  {
    id: 1,
    name: "Feeding Systems",
    slug: "feeding-systems",
    description: "Automatic feeders, feed storage solutions, and feed distribution systems for all farm sizes.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 24,
  },
  {
    id: 2,
    name: "Watering Systems",
    slug: "watering-systems",
    description: "Nipple drinkers, water storage tanks, and water purification systems for optimal hydration.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 18,
  },
  {
    id: 3,
    name: "Incubation Equipment",
    slug: "incubation-equipment",
    description: "Incubators, hatchers, and egg handling equipment for successful breeding operations.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 15,
  },
  {
    id: 4,
    name: "Housing & Coops",
    slug: "housing-coops",
    description: "Poultry houses, coops, and accessories for safe and comfortable bird housing.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 32,
  },
  {
    id: 5,
    name: "Climate Control",
    slug: "climate-control",
    description: "Heating, cooling, and ventilation systems to maintain optimal conditions for your birds.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 21,
  },
  {
    id: 6,
    name: "Monitoring Systems",
    slug: "monitoring-systems",
    description: "Smart sensors and monitoring equipment to track conditions and bird health in real-time.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 16,
  },
  {
    id: 7,
    name: "Health & Medication",
    slug: "health-medication",
    description: "Supplements, medications, and health management tools for disease prevention and treatment.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 28,
  },
  {
    id: 8,
    name: "Processing Equipment",
    slug: "processing-equipment",
    description: "Pluckers, scalders, and processing tools for efficient poultry processing operations.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 19,
  },
  {
    id: 9,
    name: "Egg Handling",
    slug: "egg-handling",
    description: "Egg collectors, washers, graders, and packaging solutions for egg production businesses.",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    productCount: 22,
  },
]

