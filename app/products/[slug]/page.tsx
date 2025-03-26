import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ }: { params: { slug: string } }) {
  // In a real app, you would fetch the product data based on the slug
  const product = {
    id: 1,
    name: "Automatic Poultry Feeder",
    slug: "automatic-poultry-feeder",
    description: "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
    longDescription:
      "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
    price: 299.99,
    image: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    gallery: [
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
      "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    ],
    features: [
      "50kg feed capacity",
      "Reduces feed waste by up to 30%",
      "Weather-resistant construction",
      "Easy to clean and maintain",
      "Adjustable flow control",
      "Suitable for chickens, ducks, and other poultry",
    ],
    specifications: [
      { name: "Dimensions", value: "60 x 40 x 70 cm" },
      { name: "Weight", value: "8.5 kg" },
      { name: "Material", value: "Food-grade plastic and galvanized steel" },
      { name: "Capacity", value: "50 kg of feed" },
      { name: "Suitable for", value: "All types of poultry" },
      { name: "Installation", value: "Floor-mounted or hanging" },
    ],
    stock: 15,
    reviews: {
      average: 4.8,
      count: 24,
    },
    relatedProducts: [2, 5, 7],
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <Link href="/products" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={product.image || "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.gallery.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
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

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

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
              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features & Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-6 border rounded-b-lg">
            <p>{product.longDescription}</p>
          </TabsContent>
          <TabsContent value="features" className="p-6 border rounded-b-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 py-2 border-b last:border-0">
                      <div className="font-medium">{spec.name}</div>
                      <div>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 border rounded-b-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">John D.</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Verified Purchase - March 15, 2023</div>
                  <p className="mt-2">
                    This feeder has been a game-changer for our small farm. We&apos;ve reduced feed waste significantly and
                    saved hours of labor each week. Highly recommended!
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Sarah M.</div>
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
                  <p className="mt-2">
                    Good quality feeder that has held up well over the past few months. Assembly was straightforward and
                    it works as advertised. Taking off one star because the flow adjustment could be more precise.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

