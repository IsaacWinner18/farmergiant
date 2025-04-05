"use client";
import { useCart } from "@/components/cartContext";
import { ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="mt-20 px-4">
      <div className="flex items-center mb-6">
        <Link
          href="/products"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shopping
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-6">Your cart is empty</p>
          <Link
            href="/products"
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : null}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-lg mb-4"
          >
            <div className="relative h-32 w-32 flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                {item.description.substring(0, 100)}...
              </p>
              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mb-6">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
          </div>
        </div>
        <button
          // onClick={() => }
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
