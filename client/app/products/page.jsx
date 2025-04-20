"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cartContext";
import Toast from "@/components/Toast";
import { useProductContext } from "@/components/productContext";



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

  
    const { products, loading, error } = useProductContext();
  


  return (
    <div className="pt-26 pb-10 bg-white">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 ">
        {products.map((product) => (
          <div key={product._id}>
            <div className="h-full overflow-hidden border border-gray-800 rounded-[12px] hover:shadow-lg">
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square relative">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-black">{product.name}</h3>
                </Link>
                <p className="text-sm text-neutral-800 line-clamp-2 mt-2">
                  {product.description.length > 60 ? `${product.description.slice(0, 60)}....` : product.description }
                </p>
                <div className="flex items-center justify-between mt-4 text-black">
                  <span className="font-bold">${Number(product.price).toLocaleString()}</span>

                  {authen ? (
                    <button
                      onClick={() => {
                        addToCart(product), handleAddToCart();
                      }}
                      // disabled={!authen}
                      size="sm"
                      variant="default"
                      className="flex items-center gap-2 border border-gray-600 bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition duration-200"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    </button>
                  ) : (
                    <Link href="/login">
                      <button
                        size="sm"
                        variant="default"
                        className="flex items-center gap-2 border border-purple-600 bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition duration-200"
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
