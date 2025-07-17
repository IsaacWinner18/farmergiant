import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FG</span>
              </div>
              <span className="text-xl font-bold">FarmerGiant</span> */}
              <Image
                src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
                alt="Farmergiant logo"
                width={80}
                height={80}
              />
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Your trusted partner for quality farm machinery and agricultural
              equipment across Nigeria. Empowering farmers with the right tools
              for success.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-green-100 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-green-100 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-green-100 hover:text-white">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-green-100 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-green-100 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-green-100 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-300" />
                <span className="text-green-100">(+234) 0909-4538-737</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-300" />
                <span className="text-green-100">resonnacesales@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-green-300 mt-1" />
                <span className="text-green-100">
                  Oluibadan Avenue, Adjacent Rehobooth Cathedral Church,
                  <br />
                  Ibadan, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p className="text-green-100">
            © {new Date().getFullYear()} FarmerGiant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
