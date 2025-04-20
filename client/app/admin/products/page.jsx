"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  ShoppingBag,
} from "lucide-react";
import Sidebar from "../sidebar";
import { useProductContext } from "@/components/productContext";



// Delete confirmation modal
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Delete Product</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{productName}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
const { products, loading, error, deleteProduct } = useProductContext();

  // const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: 0,
    productName: "",
  });
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const productsPerPage = 5;

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;

    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }

    return 0;
  });

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle delete
  const handleDelete = (id, name) => {
    setDeleteModal({ isOpen: true, productId: id, productName: name });
  };

  const confirmDelete = () => {
    setProducts(
      products.filter((product) => product.id !== deleteModal.productId)
    );
    setDeleteModal({ isOpen: false, productId: 0, productName: "" });
  };

  return (
    <div className="">
      <div className="flex">
        <div className=""></div>

        <div className="md:space-y-6 md:p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              {/* <h1 className="text-3xl font-bold">Products</h1> */}
              <p className="text-gray-500 dark:text-gray-400">
                Manage your product catalog
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="rounded-lg border bg-white p-4 m-4  shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Products
                </h3>
                <ShoppingBag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +4 added this month
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="md:w-auto inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("name")}
                        >
                          Product
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </th>

                      <th className="text-left py-3 px-4 font-medium">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("price")}
                        >
                          Price
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </th>

                      <th className="text-right py-3 px-4 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="md:w-10 w-8 md:h-10 h-8 rounded bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                
                              />
                            </div>
                            <span className="font-medium text-sm md:text-md">
                              {product.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-sm md:text-md">
                          ${product.price.toLocaleString()}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/products/${product._id}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                            <button
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() =>
                                deleteProduct(product._id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {currentProducts.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500 dark:text-gray-400"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {indexOfFirstProduct + 1}-
                    {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                    {filteredProducts.length}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 p-0 ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      } dark:border-gray-600 dark:bg-gray-800`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-md p-0 ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 p-0 ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      } dark:border-gray-600 dark:bg-gray-800`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, productId: 0, productName: "" })
        }
        onConfirm={confirmDelete}
        productName={deleteModal.productName}
      />
    </div>
  );
}
