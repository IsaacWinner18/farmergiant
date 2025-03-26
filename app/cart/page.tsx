"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Automatic Poultry Feeder",
      price: 299.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Nipple Drinking System",
      price: 189.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 p-4 bg-muted text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-6 flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <div className="w-10 text-center">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <Input placeholder="Discount code" />
                <Button variant="outline" className="w-full">
                  Apply Discount
                </Button>
              </div>
              <Button className="w-full">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <p>Free shipping on orders over $500</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

