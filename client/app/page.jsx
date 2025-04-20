"use client"
import Footer from "@/components/Footer";
import { useProductContext } from "@/components/productContext";
import Button from "@/components/ui/Button";
import {
  ChevronRight,
  ShoppingCart,
  Menu,
  Search,
  User,
  Truck,
  ShieldCheck,
  HeartHandshake,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  // Sample data
  const categories = [
    {
      id: 1,
      name: "Feeding Systems",
      slug: "feeding-systems",
      description: "Automatic feeders and feed storage solutions",
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 2,
      name: "Watering Systems",
      slug: "watering-systems",
      description: "Nipple drinkers and water storage tanks",
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 3,
      name: "Incubation Equipment",
      slug: "incubation-equipment",
      description: "Incubators and hatchers for all farm sizes",
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
    {
      id: 4,
      name: "Housing & Coops",
      slug: "housing-coops",
      description: "Poultry houses and coop accessories",
      image:
        "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg",
    },
  ];

 
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Shipping",
      description: "We deliver your equipment quickly and safely to your farm.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Quality Guaranteed",
      description:
        "All our products are built to last and come with a warranty.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Expert Support",
      description: "Our team of poultry experts is always ready to help you.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Customer Service",
      description: "We're here to answer your questions anytime you need us.",
    },
  ];

  const { products, loading, error } = useProductContext();

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-black">
        <div className="container px-6 md:px-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 mt-13 md:mt-20">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Quality Poultry Equipment for Your Farm
                </h1>
                <p className="max-w-[600px] opacity-80 text-muted-foreground md:text-xl">
                  Professional equipment for poultry farmers. Increase
                  efficiency and improve animal welfare with our premium
                  products.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 ">
                <Link href="/products">
                  <Button size="lg">
                    Shop Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="default" size="lg">
                    Browse Categories
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742127817/7D8A2690_pgjwmw.jpg"
              width={800}
              height={550}
              alt="Modern poultry equipment"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      

      <section className="w-full py-12 md:py-20 bg-white text-black">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-2xl mb-3 font-bold tracking-tighter md:text-3xl lg:text-4xl text-primary">
              Best Selling Products
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-[900px] mb-3">
              Find the perfect equipment for your poultry farm
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 ">
            {categories.map((category) => {
              return (
                // <Link key={category.id} href={`/categories/${category.slug}`}>
                <div key={category.id} className="my-3 mx-2">
                  <div className="bg-neutral-900/50 shadow-lg border border-gray-700 rounded-[18px]">
                    <div className="bg-neutral-200 aspect-square w-full rounded-[18px]">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={200}
                        height={200}
                        className=" aspect-square w-full object-cover object-center rounded-tr-[18px] rounded-tl-[18px]"
                      />
                    </div>
                    <div className="p-4 bg-white rounded-br-[18px] rounded-bl-[18px]">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-neutral-800 opacity-90 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                // </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-neutral-300 text-black">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-2xl mb-3 font-bold tracking-tighter md:text-3xl lg:text-4xl text-primary">
              Featured Products
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-[900px] mb-3">
              Our most popular poultry equipment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 ">
            {products.map((product) => {
              return (
                <Link key={product._id} href={`/products`}>
                  <div className="my-3 mx-2 ">
                    <div className="bg-neutral-900/50 shadow-lg border border-gray-100 rounded-[18px]">
                      <div className="bg-neutral-200 aspect-square w-full rounded-tr-[18px] rounded-tl-[18px]">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="aspect-square w-full object-contain object-center rounded-tr-[18px] rounded-tl-[18px]"
                        />
                      </div>
                      <div className="p-4 bg-white rounded-bl-[18px] rounded-br-[18px]">
                        <h3 className="text-lg font-semibold my-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-neutral-800 opacity-90 ">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-bold ">
                            <p className="text-sm text-neutral-500 line-through">
                              ₦
                              {Number(
                                ((product.price + 10000).toFixed(2))
                              ).toLocaleString()}
                            </p>
                            <p className="text-md">
                              ₦
                              {Number(
                                product.price.toFixed(2)
                              ).toLocaleString()}
                            </p>
                          </div>
                          <p className="">
                            <button
                              variant="default"
                              size="sm"
                              className="flex items-center gap-2 border border-gray-200 bg-purple-100 text-purple-900 px-4 py-2 rounded-full hover:bg-purple-300 transition duration-200"
                            >
                              <ShoppingCart className=" h-4 w-4" />
                              Add to Cart
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button size="lg">
                View All Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-300 text-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Why Choose Us
              </h2>
              <p className="opacity-90 max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re dedicated to providing the best poultry equipment for
                your farm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className=" py-20 bg-neutral-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-400">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "Poultry Farmer",
                image:
                  "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742128152/john_doe_agmcuj.jpg",
                quote:
                  "Poultry Pro's equipment has significantly improved our farm's productivity. Their customer service is unmatched!",
              },
              {
                name: "Emily Johnson",
                role: "Farm Manager",
                image:
                  "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1743250166/Asset-1-1_ook8oc.png",
                quote:
                  "The quality and reliability of their products are exceptional. I highly recommend Poultry Pro to any serious farmer.",
              },
              {
                name: "Michael Brown",
                role: "Agricultural Consultant",
                image:
                  "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1743897261/johndoe_nvnfch.jpg",
                quote:
                  "I've worked with many suppliers, but Poultry Pro stands out for their innovative solutions and expert support.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900/50 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-200">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-100 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Poultry Farm?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied farmers who trust farmergiant for their
            equipment needs.
          </p>
          <Link
            href="/products"
            className="bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-400 transition duration-300 inline-flex items-center"
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
