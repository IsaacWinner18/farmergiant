"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useProductContext } from "@/components/productContext";
export default function EditProductPage({ params }) {
  const router = useRouter();
  const productId = params.id;
  const { products, loading, error } = useProductContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    slug: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const product = products.find((p) => p._id === productId);

        if (!product) {
          setNotFound(true);
          return;
        }

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          slug: product.slug,
          imageUrl: product.image,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
    } catch {
      return false;
    }

    const validDomains = [
      "cloudinary.com",
      "res.cloudinary.com",
      "imgur.com",
      "i.imgur.com",
      "unsplash.com",
      "images.unsplash.com",
      "imgbb.com",
      "i.ibb.co",
      "postimg.cc",
      "postimg.org",
      "postimages.org",
      "amazonaws.com",
      "s3.amazonaws.com",
    ];

    try {
      const hostname = new URL(url).hostname;
      return validDomains.some((domain) => hostname.includes(domain));
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(Number.parseFloat(formData.price)) ||
      Number.parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidImageUrl(formData.imageUrl)) {
      newErrors.imageUrl =
        "Please enter a valid image URL (from Cloudinary, Imgur, etc.)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12 mt-16">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center">
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-4 px-4 py-2 text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700 md:col-span-1">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${
                    errors.name
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 flex h-10 w-full rounded-md border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:ring-offset-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-primary`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className={`block text-sm font-medium ${
                    errors.description
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.description
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-800`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price"
                  className={`block text-sm font-medium ${
                    errors.price
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={`mt-1 flex h-10 w-full rounded-md border ${
                    errors.price
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:ring-offset-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-primary`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className={`block text-sm font-medium ${
                    errors.slug
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Product Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`mt-1 flex h-10 w-full rounded-md border ${
                    errors.slug
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:ring-offset-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-primary`}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700 md:col-span-1">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="imageUrl"
                  className={`block text-sm font-medium ${
                    errors.imageUrl
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Product Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://res.cloudinary.com/your-image-url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={`mt-1 flex h-10 w-full rounded-md border ${
                    errors.imageUrl
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:ring-offset-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-primary`}
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter a URL from Cloudinary, Imgur, or another image hosting
                  service
                </p>
              </div>

              {formData.imageUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image Preview
                  </label>
                  <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                        if (!errors.imageUrl) {
                          setErrors((prev) => ({
                            ...prev,
                            imageUrl:
                              "Unable to load image. Please check the URL.",
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {!formData.imageUrl && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-8 text-center mt-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium">No image URL provided</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Enter a URL from Cloudinary or another image hosting
                      service
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
