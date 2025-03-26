import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ProductsPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="price-1" />
                <Label htmlFor="price-1">Under $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-2" />
                <Label htmlFor="price-2">$100 - $200</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-3" />
                <Label htmlFor="price-3">$200 - $500</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-4" />
                <Label htmlFor="price-4">Over $500</Label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Brand</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-1" />
                <Label htmlFor="brand-1">ChickenPro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-2" />
                <Label htmlFor="brand-2">FarmTech</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-3" />
                <Label htmlFor="brand-3">PoultryMaster</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-4" />
                <Label htmlFor="brand-4">EggCellent</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center mt-4 sm:mt-0">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" variant="secondary">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <span className="sr-only">Previous page</span>
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
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next page</span>
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
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
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
  },
  {
    id: 2,
    name: "Watering Systems",
    slug: "watering-systems",
  },
  {
    id: 3,
    name: "Incubation Equipment",
    slug: "incubation-equipment",
  },
  {
    id: 4,
    name: "Housing & Coops",
    slug: "housing-coops",
  },
  {
    id: 5,
    name: "Health & Medication",
    slug: "health-medication",
  },
  {
    id: 6,
    name: "Monitoring Systems",
    slug: "monitoring-systems",
  },
]

const allProducts = [
  {
    id: 1,
    name: "Automatic Poultry Feeder",
    slug: "automatic-poultry-feeder",
    description: "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
    price: 299.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 2,
    name: "Nipple Drinking System",
    slug: "nipple-drinking-system",
    description: "Complete watering system with leak-proof nipples. Easy to install and maintain.",
    price: 189.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 3,
    name: "Digital Egg Incubator",
    slug: "digital-egg-incubator",
    description:
      "Fully automatic digital incubator with capacity for 56 eggs. Precise temperature and humidity control.",
    price: 349.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 4,
    name: "Poultry Heat Lamp",
    slug: "poultry-heat-lamp",
    description: "Infrared heat lamp for chicks and poultry. Adjustable height and energy efficient.",
    price: 79.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 5,
    name: "Chicken Coop Automatic Door",
    slug: "chicken-coop-automatic-door",
    description: "Solar-powered automatic chicken coop door. Opens at sunrise and closes at sunset.",
    price: 199.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 6,
    name: "Egg Collection System",
    slug: "egg-collection-system",
    description: "Conveyor belt egg collection system for commercial farms. Reduces breakage and labor.",
    price: 599.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 7,
    name: "Poultry Scale",
    slug: "poultry-scale",
    description: "Digital scale for weighing poultry. Accurate and easy to use.",
    price: 149.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 8,
    name: "Ventilation Fan",
    slug: "ventilation-fan",
    description: "High-efficiency ventilation fan for poultry houses. Improves air quality and reduces heat stress.",
    price: 249.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 9,
    name: "Poultry Netting",
    slug: "poultry-netting",
    description: "Electric poultry netting for predator protection. Easy to install and move.",
    price: 129.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
]

