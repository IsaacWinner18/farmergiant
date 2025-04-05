"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cartContext";
import Toast from "@/components/Toast";



export default function ProductsPage() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const [authen, setAuthen] = useState(false);

    const getAuthen = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/status`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setAuthen(data.authenticated);
      console.log(data.authenticated);
    };

    useEffect(() => {
      getAuthen();
    }, []);
  
  const handleAddToCart = () => {
    setToast({
      show: true,
      message: "Product Added Successfully!",
      type: "success",
    });
  }

  // useEffect(() => {
  //   handleAddToCart
  // }, [])
  
  const allProducts = [
    {
      id: 1,
      name: "Automatic Poultry Feeder",
      slug: "automatic-poultry-feeder",
      description:
        "Efficient automatic feeding system with 50kg capacity. Reduces waste and labor costs.",
      price: 299.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 2,
      name: "Nipple Drinking System",
      slug: "nipple-drinking-system",
      description:
        "Complete watering system with leak-proof nipples. Easy to install and maintain.",
      price: 189.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 3,
      name: "Digital Egg Incubator",
      slug: "digital-egg-incubator",
      description:
        "Fully automatic digital incubator with capacity for 56 eggs. Precise temperature and humidity control.",
      price: 349.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 4,
      name: "Poultry Heat Lamp",
      slug: "poultry-heat-lamp",
      description:
        "Infrared heat lamp for chicks and poultry. Adjustable height and energy efficient.",
      price: 79.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 5,
      name: "Chicken Coop Automatic Door",
      slug: "chicken-coop-automatic-door",
      description:
        "Solar-powered automatic chicken coop door. Opens at sunrise and closes at sunset.",
      price: 199.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 6,
      name: "Egg Collection System",
      slug: "egg-collection-system",
      description:
        "Conveyor belt egg collection system for commercial farms. Reduces breakage and labor.",
      price: 599.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 7,
      name: "Poultry Scale",
      slug: "poultry-scale",
      description:
        "Digital scale for weighing poultry. Accurate and easy to use.",
      price: 149.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 8,
      name: "Ventilation Fan",
      slug: "ventilation-fan",
      description:
        "High-efficiency ventilation fan for poultry houses. Improves air quality and reduces heat stress.",
      price: 249.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 9,
      name: "Poultry Netting",
      slug: "poultry-netting",
      description:
        "Electric poultry netting for predator protection. Easy to install and move.",
      price: 129.99,
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
  ];


  return (
    <div className="mt-26 mb-10">

       {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
              />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
        {allProducts.map((product) => (
          <div key={product.id}>
            <div className="h-full overflow-hidden border border-gray-800 rounded-[12px] hover:shadow-lg">
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold">${product.price.toFixed(2)}</span>

                  {authen ? (
                    <button
                      onClick={() => {addToCart(product), handleAddToCart()}}
                      // disabled={!authen}
                      size="sm"
                      variant="default"
                      className="flex items-center gap-2 border border-gray-600 bg-green-100 text-green-900 px-4 py-2 rounded-full hover:bg-green-300 transition duration-200"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    </button>
                  ) : (
                      <Link href="/login">
                    <button
                      
                      size="sm"
                      variant="default"
                      className="flex items-center gap-2 border border-gray-600 bg-green-100 text-green-900 px-4 py-2 rounded-full hover:bg-green-300 transition duration-200"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Login to Add
                    </button>

                      </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
