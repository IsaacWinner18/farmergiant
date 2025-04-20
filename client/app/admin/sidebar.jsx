"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    // { href: "/admin/products", label: "Products", icon: ShoppingBag },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className=" pt-2 bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="lg:hidden  z-30 p-2 md:p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 mr-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-xl hidden lg:flex">
            <span className="">
              <Link href="/" className="">
                <Image
                  alt="Logo"
                  src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
                  width={82}
                  height={82}
                />
              </Link>
            </span>
            Admin
          </span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            A
          </div>
        </div> */}
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 lg:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`pt-10 fixed top-0 left-0 z-20 h-full w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-xl">
              <Link href="/" className="">
                <Image
                  alt="Logo"
                  src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
                  width={82}
                  height={82}
                />
              </Link>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === item.href
                      ? "bg-gray-100 dark:bg-gray-700 text-primary"
                      : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-4 border-t">
            <button className="w-full p-2 rounded-md flex items-center justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`h-screen z-10 transition-all duration-300 hidden lg:block ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <span
            className={`font-bold text-xl transition-opacity duration-200 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <Link href="/" className="">
              <Image
                alt="Logo"
                src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
                width={82}
                height={82}
              />
            </Link>
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 ml-auto"
          >
            <ChevronDown
              className={`transform transition-transform duration-200 ${
                isSidebarOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === item.href
                      ? "bg-gray-100 dark:bg-gray-700 text-primary"
                      : ""
                  }`}
                >
                  <item.icon
                    size={20}
                    className={isSidebarOpen ? "mr-3" : "mx-auto"}
                  />
                  <span
                    className={`transition-opacity duration-200 ${
                      isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={`mt-8 pt-4 ${isSidebarOpen ? "border-t" : ""}`}>
            <button
              className={`w-full p-2 rounded-md flex items-center ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20`}
            >
              <LogOut size={20} className={isSidebarOpen ? "mr-3" : ""} />
              <span
                className={`transition-opacity duration-200 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
