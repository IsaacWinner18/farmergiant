"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MobileNav from "@/components/layout/mobile-nav"
import WhatsAppFloat from "@/components/whatsapp-float"
import { MessageCircle, Phone, Mail } from "lucide-react"

export default function QuotePage() {
  const [formData, setFormData] = useState({
    equipmentType: "",
    useCase: "",
    budget: "",
    preferredBrand: "",
    location: "",
    whatsapp: "",
    email: "",
    fullName: "",
    additionalInfo: "",
  })

  const equipmentTypes = [
    "Tractors",
    "Sprayers & Irrigation",
    "Earth Moving Equipment",
    "Livestock Equipment",
    "Food Processing Tools",
    "Harvesting Equipment",
    "Planting Equipment",
    "Other (Please specify)",
  ]

  const budgetRanges = [
    "Under ₦1,000,000",
    "₦1,000,000 - ₦5,000,000",
    "₦5,000,000 - ₦10,000,000",
    "₦10,000,000 - ₦20,000,000",
    "Above ₦20,000,000",
    "I need guidance on budget",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle quote request submission
    console.log("Quote request submitted:", formData)
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Request a Quote</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations and pricing for your farm equipment needs. Our agricultural specialists
            will contact you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        className="input-field"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="input-field"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        required
                        className="input-field"
                        placeholder="+234 xxx xxx xxxx"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location (State/City) *
                      </label>
                      <input
                        type="text"
                        id="location"
                        required
                        className="input-field"
                        placeholder="e.g., Lagos, Nigeria"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Equipment Requirements */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Equipment Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Equipment Needed *
                      </label>
                      <select
                        id="equipmentType"
                        required
                        className="input-field"
                        value={formData.equipmentType}
                        onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      >
                        <option value="">Select Equipment Type</option>
                        {equipmentTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                        Intended Use Case *
                      </label>
                      <textarea
                        id="useCase"
                        required
                        rows={3}
                        className="input-field"
                        placeholder="Describe your farming operation, land size, crops, etc."
                        value={formData.useCase}
                        onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        className="input-field"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Select Budget Range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="preferredBrand" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Brand (Optional)
                      </label>
                      <input
                        type="text"
                        id="preferredBrand"
                        className="input-field"
                        placeholder="e.g., John Deere, Massey Ferguson, New Holland"
                        value={formData.preferredBrand}
                        onChange={(e) => setFormData({ ...formData, preferredBrand: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        rows={4}
                        className="input-field"
                        placeholder="Any specific requirements, questions, or additional details..."
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-lg py-4">
                  Submit Quote Request
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/2348031234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">WhatsApp</div>
                    <div className="text-sm text-green-600">Chat with us now</div>
                  </div>
                </a>

                <a
                  href="tel:+2348031234567"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Call Us</div>
                    <div className="text-sm text-blue-600">+234 803 123 4567</div>
                  </div>
                </a>

                <a
                  href="mailto:info@farmergiant.ng"
                  className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-orange-800">Email</div>
                    <div className="text-sm text-orange-600">info@farmergiant.ng</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    1
                  </span>
                  We review your requirements within 2 hours
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    2
                  </span>
                  Our specialist contacts you via WhatsApp/phone
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    3
                  </span>
                  We provide personalized recommendations
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    4
                  </span>
                  You receive detailed quote within 24 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
      <WhatsAppFloat />
    </div>
  )
}
