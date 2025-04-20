"use client";

import Link from "next/link";
import { ShoppingBag, BookOpen, Users, ArrowRight } from "lucide-react";
import Sidebar from "./sidebar";
import ProductsPage from "./products/page";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [authen, setAuthen] = useState(false);

  const getAuthen = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/admin/auth/status`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAuthen(data.authenticated);
    console.log(data.authenticated);
    if (data.authenticated != true) {
      window.location.href = "/login"
    }
  };
  useEffect(() => {
    getAuthen();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        <div className="mt-10 md:h-screen">
          <Sidebar />
        </div>
        <div className="space-y-6 p-4 mt-16 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, Admin
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2 bg-purple-400 rounded-full">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          

            {/* <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Users
                </h3>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +201 since last month
              </p>
            </div> */}
          <ProductsPage />
          </div>

        </div>
      </div>
    </div>
  );
}
