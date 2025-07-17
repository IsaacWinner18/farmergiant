"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import WhatsAppFloat from "@/components/whatsapp-float";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URI
        }/api/read/products?limit=50&name=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setResults(data.products || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-900">
          Search Products
        </h1>
        <form
          onSubmit={handleSearch}
          className="mb-8 flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2"
        >
          <input
            type="text"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            disabled={loading || !query.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((product: any) => (
              <Link
                key={product._id}
                href={`/product/${product.slug || product._id}`}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition border border-green-100 overflow-hidden"
              >
                <div className="aspect-w-4 aspect-h-3 bg-green-100">
                  <Image
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-lg text-green-900 mb-1 truncate">
                    {product.name}
                  </h2>
                  <div className="text-green-700 font-semibold mb-2">
                    {product.price
                      ? `₦${product.price.toLocaleString()}`
                      : "Price on request"}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {product.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!loading && results.length === 0 && query && !error && (
          <div className="text-gray-500 mt-8">
            No products found for "{query}".
          </div>
        )}
      </main>
      <WhatsAppFloat />
      <MobileNav />
      <Footer />
    </div>
  );
}
