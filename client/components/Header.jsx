"use client";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ui/Theme-toggle";
import MenuSlide from "./ui/MenuSlide";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Headers() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [logOutToggle, setLogOutToggle] = useState(false);
  const [authen, setAuthen] = useState(false)

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
    const data = await response.json()
    setAuthen(data.authenticated)
  }

  useEffect(() => {
    getAuthen()
  }, [])

  const getLogOut = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/logout`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  };

  const handleMenuToggle = () => {
    const newToggle = !toggleMenu;
    setToggleMenu(newToggle);
  };

    const handleLogOutToggle = () => {
      const newToggle = !logOutToggle;
      setLogOutToggle(newToggle);
    };

  return (
    <div className="pb-6">
      <div className="fixed w-full z-50 backdrop-blur-2xl top-0 flex justify-between py-1 bg-neutral-900/50">
        <div className="flex items-center ">
          <div className="inline-flex p-1 rounded-md border border-gray-600 m-2 md:hidden">
            <Menu className="h-7 w-7" onClick={handleMenuToggle} />
          </div>
          <Link href="/" className="p-2">
            <Image
              alt="Logo"
              src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png"
              width={82}
              height={82}
            />
          </Link>
        </div>

        <nav className="mx-6 hidden md:flex justify-center items-center gap-6 text-sm">
          {/* <Link href="/" className="font-medium transition-colors hover:text-primary">
                  Home
                </Link> */}
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-primary"
          >
            All Products
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-primary"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-0 m-3 md:mr-20 md:space-x-2">
          <ThemeToggle />
          {authen ? (
            <Link href="/cart ">
              {" "}
              <ShoppingCart className="h-5 w-5 ml-2" />
            </Link>
          ) : (
            <p></p>
          )}

          {authen ? (
            <div>
              <User
                onClick={() => {
                  handleLogOutToggle();
                }}
                className="h-5 w-5 mx-2"
              />
              <div
                className={`${logOutToggle ? "flex" : "hidden"} absolute right-2 top-12 bg-neutral-900 rounded-md p-2 w-20 text-center`}
              >
                <button onClick={async () => { await getLogOut(), window.location.href = "/" }} className="text-sm text-red-300">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-2 md:space-x-2">
              <button className=" hidden md:inline-flex px-4 py-2 bg-purple-700/80 text-white text-sm rounded-md hover:bg-purple-500/80 ">
                <Link href="/signup">Sign up</Link>
              </button>
              <button
                onClick={getAuthen}
                className="md:inline-flex px-4 py-2 bg-purple-700/80 text-white text-sm rounded-md hover:bg-purple-500/80 "
              >
                <Link href="/login">Login</Link>
              </button>
            </div>
          )}
        </div>

        <MenuSlide
          toggleMenu={toggleMenu}
          onClose={() => setToggleMenu(false)}
        />
      </div>
    </div>
  );
}
