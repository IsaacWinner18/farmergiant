"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, Search, ShoppingCart, MessageCircle } from "lucide-react"

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/products", icon: Grid3X3, label: "Categories" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "https://wa.me/2348031234567", icon: MessageCircle, label: "WhatsApp", external: true },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center py-2 px-3 text-xs"
              >
                <Icon className={`w-6 h-6 mb-1 ${item.label === "WhatsApp" ? "text-green-500" : "text-gray-600"}`} />
                <span className={item.label === "WhatsApp" ? "text-green-500" : "text-gray-600"}>{item.label}</span>
              </a>
            )
          }

          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center py-2 px-3 text-xs">
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-green-600" : "text-gray-600"}`} />
              <span className={isActive ? "text-green-600" : "text-gray-600"}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
