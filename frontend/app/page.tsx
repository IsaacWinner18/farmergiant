import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile-nav";
import WhatsAppFloat from "@/components/whatsapp-float";
import ProductCarousel from "@/components/product-carousel";
import AdCarousel from "@/components/ad-carousel";
import BestSellingCarousel from "@/components/best-selling-carousel";
import CategoriesGrid from "@/components/categories-grid";
import { Shield, Users, Headphones, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const trustFeatures = [
    {
      icon: Shield,
      title: "10+yrs Experience",
      description: "Trusted by thousands of farmers across Nigeria",
    },
    {
      icon: MapPin,
      title: "Nationwide Network",
      description: "Service centers in all major agricultural zones",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical support and maintenance",
    },
    {
      icon: Users,
      title: "Secure Delivery",
      description: "Safe and timely delivery to your farm",
    },
  ];

  const testimonials = [
    {
      name: "Alhaji Musa Ibrahim",
      location: "Kaduna State",
      text: "FarmerGiant helped me get the right tractor for my 50-hectare farm. Excellent service and fair prices.",
      rating: 5,
    },
    {
      name: "Mrs. Adunni Okafor",
      location: "Ogun State",
      text: "Their irrigation system transformed my vegetable farm. Now I can farm all year round.",
      rating: 5,
    },
    {
      name: "Chief Emeka Nwankwo",
      location: "Anambra State",
      text: "Professional team, quality equipment, and great after-sales support. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* <h1 className="text-xl lg:text-4xl font-bold leading-tight mb-6 text-center">
                Your one-stop shop for
                <span className="text-yellow-300"> farm machinery</span>
              </h1> */}
              <p className="text-sm lg:text-xl text-green-100 mb-8 leading-relaxed">
                Poultry, Battery Cages, poultry equipment, Day old birds,Point
                of Lay Birds, piggery, and general veterinary and farm
                consultancy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="btn-primary md:text-lg px-4 md:px-8 py-4 text-center"
                >
                  Shop by Category
                </Link>
                <Link
                  href="/quote"
                  className="btn-secondary text-lg px-8 py-4 text-center"
                >
                  Talk to a Specialist
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1752590255/feedpellet_hsxr7k.webp"
                alt="Farm machinery"
                width={200}
                height={80}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing + Ads Section */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Discover our latest and most popular farm equipment
            </p>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden lg:flex gap-4">
            <div className="max-w-[74%] flex-1">
              <ProductCarousel />
            </div>
            <div className="w-80 flex-shrink-0">
              <AdCarousel />
            </div>
          </div>

          {/* Mobile Layout: Stacked */}
          <div className="lg:hidden space-y-8">
            <ProductCarousel />
            <AdCarousel />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 lg:py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-3 lg:px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-md text-gray-600 max-w-3xl mx-auto">
              Find the perfect equipment for your farming needs from our
              comprehensive range
            </p>
          </div>
          <CategoriesGrid />
        </div>
      </section>

      {/* Best Selling + Ad Banner Section */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              Best Selling Equipment
            </h2>
            <p className="text-md text-gray-600">
              Most popular choices among Nigerian farmers
            </p>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden lg:flex gap-4 items-start">
            <div className="max-w-[75%]">
              <BestSellingCarousel />
            </div>
            <div className="w-72">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Special Financing Available!
                </h3>
                <p className="mb-6">
                  Get up to 24 months payment plan on tractors and heavy
                  machinery
                </p>
                <Link
                  href="/quote"
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Stacked */}
          <div className="lg:hidden space-y-8">
            <BestSellingCarousel />
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Special Financing Available!
              </h3>
              <p className="mb-6">
                Get up to 24 months payment plan on tractors and heavy machinery
              </p>
              <Link
                href="/quote"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose FarmerGiant?
            </h2>
            <p className="text-sm text-gray-600">
              Your trusted partner in agricultural success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-3 h-3 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-md md:text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-md text-gray-600">
              Real stories from satisfied farmers across Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Stay Updated with FarmerGiant
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Get the latest updates on new equipment, farming tips, and special
            offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
      <WhatsAppFloat />
    </div>
  );
}
