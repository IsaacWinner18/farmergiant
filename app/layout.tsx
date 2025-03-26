import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ShoppingCart, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Farmergiant - Quality Poultry Equipment",
  description:
    "Professional equipment for poultry farmers. Increase efficiency and improve animal welfare with our premium products.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className=" mx-5 flex h-16 items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/" className="text-lg font-semibold">
                      Home
                    </Link>
                    <Link href="/products" className="text-lg font-semibold">
                      All Products
                    </Link>
                    <Link href="/categories" className="text-lg font-semibold">
                      Categories
                    </Link>
                    <Link href="/about" className="text-lg font-semibold">
                      About Us
                    </Link>
                    <Link href="/contact" className="text-lg font-semibold">
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  <Image src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png" alt="Poultry Tech" width={82} height={82} />
                </span>
              </Link>
              <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
                {/* <Link href="/" className="font-medium transition-colors hover:text-primary">
                  Home
                </Link> */}
                <Link href="/products" className="font-medium transition-colors hover:text-primary">
                  All Products
                </Link>
                <Link href="/categories" className="font-medium transition-colors hover:text-primary">
                  Categories
                </Link>
                <Link href="/about" className="font-medium transition-colors hover:text-primary">
                  About Us
                </Link>
                <Link href="/contact" className="font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
              </nav>
              <div className="hidden md:flex items-center ml-auto gap-4">
                <form className="hidden md:flex items-center">
                  <Input type="search" placeholder="Search products..." className="w-[200px] lg:w-[300px]" />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
                <ThemeToggle />
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </div>
              <div className="flex items-center md:hidden ml-auto gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="w-full border-t bg-muted py-12">
            <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">farmergiant</h3>
                <p className="text-sm text-muted-foreground">
                  Quality poultry equipment for farms of all sizes. Helping farmers improve efficiency and animal
                  welfare since 2010.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/products" className="text-muted-foreground hover:text-primary">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="text-muted-foreground hover:text-primary">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/shipping" className="text-muted-foreground hover:text-primary">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-muted-foreground hover:text-primary">
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-muted-foreground hover:text-primary">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <address className="not-italic text-sm text-muted-foreground">
                  <p>123 Farm Road</p>
                  <p>Poultry Town, PT 12345</p>
                  <p className="mt-2">Email: info@poultrytech.com</p>
                  <p>Phone: (123) 456-7890</p>
                </address>
              </div>
            </div>
            <div className="container mt-8 border-t pt-8 px-4 md:px-6">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Farmergiant. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

