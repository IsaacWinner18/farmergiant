import Image from "next/image";
import Link from "next/link";

export default function Footer() { 
    return (
      <footer className="w-full border-t bg-white text-black py-12 bg-gray-900/50">
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              <Link href="/admin">
              <Image
                alt="Logo"
                src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
                width={82}
                height={82}
              />
              </Link>
            </h3>
            <p className="text-sm text-neutral-900">
              Quality poultry equipment for farms of all sizes. Helping farmers
              improve efficiency and animal welfare since 2010.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-primary"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm text-black">
              <p className="text-green-800">Farmergiant Nigeria Limited</p>
              <p className="text-neutral-700">
                Oluibadan Avenue, Adjacent Rehobooth Cathedral Church, Ibadan,
                Nigeria.
              </p>
              <p className="mt-2 text-neutral-900">
                Email: resonnacesales@gmail.com
              </p>
              <p className="text-neutral-800">Phone: (+234) 0909-4538-737</p>
            </address>
          </div>
        </div>
        <div className="container mt-8 border-t pt-8 px-4 md:px-6">
          <p className="text-center text-sm text-neutral-800">
            © {new Date().getFullYear()} Farmergiant. All rights reserved.
          </p>
        </div>
      </footer>
    );
}