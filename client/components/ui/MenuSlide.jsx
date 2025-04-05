"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function MenuSlide({ toggleMenu, onClose }) {
  
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
  console.log(data.authenticated);  
  }
  
  useEffect(() => {
    getAuthen()
  }, [])

const [authen, setAuthen] = useState(false);


  return (
    <div className={`w-full h-screen ${toggleMenu ? "block" : "hidden"}`}>
      <div className=" absolute left-0 z-50 w-[300px] h-screen bg-gray-900 backdrop-blur-sm">
        <div className="">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Menu</h1>
            <p className="border border-gray-200 rounded-md">
              <X className="text-white " onClick={onClose} />
            </p>
          </div>
          <ul className="ml-6" onClick={onClose}>
            <li className="p-2 hover:bg-gray-600 rounded-md">
              {" "}
              <Link
                href="/"
                className="font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-600 rounded-md">
              <Link
                href="/products"
                className="font-medium transition-colors hover:text-primary"
              >
                All Products
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-600 rounded-md">
              <Link
                href="/categories"
                className="font-medium transition-colors hover:text-primary"
              >
                Categories
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-600 rounded-md">
              <Link
                href="/about"
                className="font-medium transition-colors hover:text-primary"
              >
                About Us
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-600 rounded-md">
              {/* <Link
                href="/contact"
                className="font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link> */}
            </li>

            { authen ? (<p></p>) : (<div className="flex gap-2 my-2">
              <li className="p-2 bg-green-700 hover:bg-green-400 rounded-md">
                <Link href="/signup">Sign up</Link>
              </li>
              <li className="p-2 bg-green-700 hover:bg-green-400 rounded-md">
                <Link href="/login">Login</Link>
              </li>
            </div>)
            }
            
          </ul>
        </div>
      </div>
    </div>
  );
}
