import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ShoppingCart, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the category and its products based on the slug
  const category = categories.find((cat) => cat.slug === params.slug) || categories[0]
  const categoryProducts = products.filter((product) => product.categoryId === category.id)

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
        <span className="font-medium text-primary">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="relative rounded-xl overflow-hidden mb-6 md:mb-8">
        <div className="aspect-[3/1] md:aspect-[4/1] relative">
          <Image
            src={category.bannerImage || "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">{category.name}</h1>
            <p className="text-white/90 max-w-2xl text-sm md:text-xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden w-full mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>Narrow down products to find exactly what you need</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-price-1" />
                      <Label htmlFor="mobile-price-1">Under $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-price-2" />
                      <Label htmlFor="mobile-price-2">$100 - $200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-price-3" />
                      <Label htmlFor="mobile-price-3">$200 - $500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-price-4" />
                      <Label htmlFor="mobile-price-4">Over $500</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Brand</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-brand-1" />
                      <Label htmlFor="mobile-brand-1">ChickenPro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-brand-2" />
                      <Label htmlFor="mobile-brand-2">FarmTech</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-brand-3" />
                      <Label htmlFor="mobile-brand-3">PoultryMaster</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-brand-4" />
                      <Label htmlFor="mobile-brand-4">EggCellent</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Capacity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-capacity-1" />
                      <Label htmlFor="mobile-capacity-1">Small (1-50 birds)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-capacity-2" />
                      <Label htmlFor="mobile-capacity-2">Medium (51-200 birds)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-capacity-3" />
                      <Label htmlFor="mobile-capacity-3">Large (201-1000 birds)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mobile-capacity-4" />
                      <Label htmlFor="mobile-capacity-4">Commercial (1000+ birds)</Label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filters Sidebar - Desktop */}
        <div className="hidden md:block w-full md:w-64 space-y-6 flex-shrink-0">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Filter By</h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
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
                <h4 className="font-medium mb-3">Brand</h4>
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

              <div>
                <h4 className="font-medium mb-3">Capacity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="capacity-1" />
                    <Label htmlFor="capacity-1">Small (1-50 birds)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="capacity-2" />
                    <Label htmlFor="capacity-2">Medium (51-200 birds)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="capacity-3" />
                    <Label htmlFor="capacity-3">Large (201-1000 birds)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="capacity-4" />
                    <Label htmlFor="capacity-4">Commercial (1000+ birds)</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">{category.name} Products</h2>
              <p className="text-muted-foreground">{categoryProducts.length} products available</p>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-secondary hover:border-primary">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        {product.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
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

          {/* Pagination */}
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
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
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

      {/* Category Guide */}
      <div className="mt-12 md:mt-16 bg-accent rounded-xl overflow-hidden">
        <div className="p-6 md:p-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-primary">
            Guide to Choosing the Right {category.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-sm md:text-base">
                Selecting the right {category.name.toLowerCase()} for your poultry farm is crucial for optimal
                productivity and bird health. Consider these key factors when making your decision:
              </p>
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
                  <span>
                    <strong>Flock Size:</strong> Match the capacity of your equipment to your current and planned flock
                    size.
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
                  <span>
                    <strong>Bird Type:</strong> Different poultry species have different requirements. Ensure
                    compatibility.
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
                  <span>
                    <strong>Climate:</strong> Consider your local climate and whether you need equipment with weather
                    resistance.
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
                  <span>
                    <strong>Automation:</strong> Determine how much automation you need based on your labor
                    availability.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm md:text-base">
                Our expert team is available to help you select the perfect {category.name.toLowerCase()} for your
                specific needs. Contact us for personalized recommendations.
              </p>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Need help choosing?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our poultry experts can provide personalized recommendations based on your specific farm requirements.
                </p>
                <Button>Contact Our Experts</Button>
              </div>
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
    description: "Automatic feeders, feed storage solutions, and feed distribution systems for all farm sizes.",
    bannerImage: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 2,
    name: "Watering Systems",
    slug: "watering-systems",
    description: "Nipple drinkers, water storage tanks, and water purification systems for optimal hydration.",
    bannerImage: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 3,
    name: "Incubation Equipment",
    slug: "incubation-equipment",
    description: "Incubators, hatchers, and egg handling equipment for successful breeding operations.",
    bannerImage: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
]

const products = [
  {
    id: 1,
    name: "Automatic Poultry Feeder",
    slug: "automatic-poultry-feeder",
    description: "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
    price: 299.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: true,
    discount: 0,
  },
  {
    id: 2,
    name: "High-Capacity Feed Silo",
    slug: "high-capacity-feed-silo",
    description: "Large capacity feed storage silo with 2-ton capacity. Weather-resistant and easy to refill.",
    price: 899.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: false,
    discount: 10,
  },
  {
    id: 3,
    name: "Feed Distribution System",
    slug: "feed-distribution-system",
    description: "Automated feed distribution system for large poultry houses. Ensures even feed distribution.",
    price: 649.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: false,
    discount: 0,
  },
  {
    id: 4,
    name: "Compact Poultry Feeder",
    slug: "compact-poultry-feeder",
    description: "Space-saving feeder for small flocks. 20kg capacity with anti-waste design.",
    price: 149.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: false,
    discount: 0,
  },
  {
    id: 5,
    name: "Premium Feed Trough",
    slug: "premium-feed-trough",
    description: "Heavy-duty feed trough with adjustable height. Suitable for all types of poultry.",
    price: 89.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: false,
    discount: 15,
  },
  {
    id: 6,
    name: "Automatic Feed Scale",
    slug: "automatic-feed-scale",
    description: "Precision feed weighing system for accurate feed management and monitoring.",
    price: 399.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 1,
    isNew: true,
    discount: 0,
  },
  {
    id: 7,
    name: "Nipple Drinking System",
    slug: "nipple-drinking-system",
    description: "Complete watering system with leak-proof nipples. Easy to install and maintain.",
    price: 189.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 2,
    isNew: false,
    discount: 0,
  },
  {
    id: 8,
    name: "Water Pressure Regulator",
    slug: "water-pressure-regulator",
    description:
      "Precision water pressure regulator for optimal nipple drinker performance. Prevents leaks and ensures consistent flow.",
    price: 79.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 2,
    isNew: false,
    discount: 5,
  },
  {
    id: 9,
    name: "Water Storage Tank",
    slug: "water-storage-tank",
    description: "500-gallon water storage tank with filtration system. Ensures clean water supply for your flock.",
    price: 499.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 2,
    isNew: false,
    discount: 0,
  },
  {
    id: 10,
    name: "Bell Drinker Set",
    slug: "bell-drinker-set",
    description: "Traditional bell drinkers, pack of 5. Simple and reliable watering solution for small farms.",
    price: 129.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 2,
    isNew: false,
    discount: 20,
  },
  {
    id: 11,
    name: "Water Purification System",
    slug: "water-purification-system",
    description:
      "Advanced water purification system with UV sterilization. Eliminates harmful bacteria and improves bird health.",
    price: 349.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 2,
    isNew: true,
    discount: 0,
  },
  {
    id: 12,
    name: "Digital Egg Incubator",
    slug: "digital-egg-incubator",
    description:
      "Fully automatic digital incubator with capacity for 56 eggs. Precise temperature and humidity control.",
    price: 349.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    categoryId: 3,
    isNew: false,
    discount: 0,
  },
]

