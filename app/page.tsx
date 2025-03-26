import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Quality Poultry Equipment for Your Farm
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Professional equipment for poultry farmers. Increase efficiency and improve animal welfare with our
                  premium products.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">
                    Shop Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"
              width={800}
              height={550}
              alt="Modern poultry equipment"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find the perfect equipment for your poultry farm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular poultry equipment
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {products.map((product) => (
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
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button size="lg">
                View All Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re dedicated to providing the best poultry equipment for your farm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const categories = [
  {
    id: 1,
    name: "Feeding Systems",
    slug: "feeding-systems",
    description: "Automatic feeders and feed storage solutions",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 2,
    name: "Watering Systems",
    slug: "watering-systems",
    description: "Nipple drinkers and water storage tanks",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 3,
    name: "Incubation Equipment",
    slug: "incubation-equipment",
    description: "Incubators and hatchers for all farm sizes",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
  },
  {
    id: 4,
    name: "Housing & Coops",
    slug: "housing-coops",
    description: "Poultry houses and coop accessories",
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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
]

import { Truck, ShieldCheck, HeartHandshake, Clock } from "lucide-react"

const features = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Fast Shipping",
    description: "We deliver your equipment quickly and safely to your farm.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Quality Guaranteed",
    description: "All our products are built to last and come with a warranty.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Expert Support",
    description: "Our team of poultry experts is always ready to help you.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Customer Service",
    description: "We're here to answer your questions anytime you need us.",
  },
]

