"use client"
import { useCart } from "@/components/cartContext";
import Toast from "@/components/Toast";
import Button from "@/components/ui/Button";
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { useState } from "react";


  const products = [
    {
      id: 1,
      stock: 3,
      name: "Automatic Poultry Feeder",
      slug: "automatic-poultry-feeder",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      longDescription:
        "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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

      reviews: {
        average: 4.8,
        count: 24,
      },
      relatedProducts: [2, 5, 7],
    },
    {
      id: 2,
      stock: 3,
      name: "nipple-drinking-system",
      slug: "nipple-drinking-system",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      longDescription:
        "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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

      reviews: {
        average: 4.8,
        count: 24,
      },
      relatedProducts: [2, 5, 7],
    },
    {
      id: 3,
      stock: 3,
      name: "digital-egg-incubator",
      slug: "digital-egg-incubator",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      longDescription:
        "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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

      reviews: {
        average: 4.8,
        count: 24,
      },
      relatedProducts: [2, 5, 7],
    },
    {
      id: 4,
      stock: 3,
      name: "poultry-heat-lamp",
      slug: "poultry-heat-lamp",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      longDescription:
        "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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

      reviews: {
        average: 4.8,
        count: 24,
      },
      relatedProducts: [2, 5, 7],
    },
    {
      id: 5,
      stock: 3,
      name: "chicken-coop-automatic-door",
      slug: "chicken-coop-automatic-door",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      longDescription:
        "The Automatic Poultry Feeder is designed to make feeding your poultry flock easier and more efficient. With a 50kg capacity, this feeder reduces the frequency of refills and ensures your birds always have access to feed. The innovative design minimizes waste by preventing birds from scratching feed onto the ground. Made from durable, food-safe materials, this feeder is built to withstand the demands of daily use in a farm environment. The adjustable flow control allows you to customize the feed rate based on your flock's needs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
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

      reviews: {
        average: 4.8,
        count: 24,
      },
      relatedProducts: [2, 5, 7],
    },
  ];


// Function to get product by slug
const getProductBySlug = (slug) => {
  return products.find((product) => product.slug === slug);
};

export default function ProductPage({ params }) {
  const product = getProductBySlug(params);


  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }


  const [stockCount, setStockCount] = useState(0);

  const handlePlus = () => {
    setStockCount((prev) => {
      return prev + 1;
    });
  };
  const handleMinus = () => {
    setStockCount((prev) => {
      return Math.max(prev - 1, 0);
    });
  };

    const handleAddToCart = () => {
      setToast({
        show: true,
        message: "Product Added Successfully!",
        type: "success",
      });
    }
  
  return (
    <div className="container px-4 md:px-6 py-8 mt-6 md:mt-24">
      <Link
        href="/products"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

        {toast.show && (
                    <Toast
                      message={toast.message}
                      type={toast.type}
                      onClose={() => setToast({ ...toast, show: false })}
                    />
            )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="">
            <div className="space-y-4">
              <div className=" rounded-lg overflow-hidden">
                <Image
                  src={
                    product.image ||
                    "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"
                  }
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
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
          </div>
        <div>
            <div className="my-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.reviews.average)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.reviews.average} ({product.reviews.count}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={handleMinus} className="rounded-tl-[8px] rounded-bl-[8px] py-3 px-1 hover:bg-green-800">
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </button>
                  <div className="px-4 py-2">{stockCount}</div>
                  <button
                    onClick={handlePlus}
                    className="rounded-tr-[8px] rounded-br-[8px] py-3 px-1 hover:bg-green-800"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </button>
                </div>
                <Button onClick={() => {addToCart(product), handleAddToCart();}} size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
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
    </div>
  );
}
