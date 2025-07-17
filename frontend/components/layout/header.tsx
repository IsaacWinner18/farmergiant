"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/components/cartContext";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FG</span>
            </div>
            <span className="text-sm md:text-xl font-bold text-green-800">
              FarmerGiant
            </span> */}
            <Image src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png" alt="Farmergiant logo" width={80} height={80} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="text-gray-700 hover:text-green-600 font-medium flex items-center"
              >
                Products
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/products?category=tractors"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Tractors
                  </Link>
                  <Link
                    href="/products?category=sprayers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Sprayers
                  </Link>
                  <Link
                    href="/products?category=earth-movers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Earth Movers
                  </Link>
                  <Link
                    href="/products?category=livestock"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Livestock Equipment
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/quote"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Request Quote
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-green-600 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <Link
              href="/login"
              className="p-2 text-gray-600 hover:text-green-600"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/quote"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
