import Link from "next/link"
import { Tractor, SprayCanIcon as Sprayer, Truck, MilkIcon as Cow, Wrench, Wheat, Scissors, Hammer } from "lucide-react"

export default function CategoriesGrid() {
  const categories = [
    {
      icon: Tractor,
      title: "Tractors & Tillers",
      description: "Heavy-duty tractors and tillers for all farm sizes",
      href: "/products?category=tractors",
      color: "from-green-500 to-green-700",
      count: "150+ Products",
    },
    {
      icon: Sprayer,
      title: "Sprayers & Irrigation",
      description: "Efficient spraying and irrigation equipment",
      href: "/products?category=sprayers",
      color: "from-blue-500 to-blue-700",
      count: "80+ Products",
    },
    {
      icon: Truck,
      title: "Earth Moving",
      description: "Bulldozers, excavators, and earth moving machinery",
      href: "/products?category=earth-movers",
      color: "from-orange-500 to-orange-700",
      count: "60+ Products",
    },
    {
      icon: Cow,
      title: "Livestock Equipment",
      description: "Feed mixers, milking machines, and livestock tools",
      href: "/products?category=livestock",
      color: "from-purple-500 to-purple-700",
      count: "45+ Products",
    },
    {
      icon: Wheat,
      title: "Harvesting Equipment",
      description: "Combine harvesters, threshers, and grain handling",
      href: "/products?category=harvesting",
      color: "from-yellow-500 to-yellow-700",
      count: "35+ Products",
    },
    {
      icon: Scissors,
      title: "Cutting & Mowing",
      description: "Mowers, cutters, and grass cutting equipment",
      href: "/products?category=cutting",
      color: "from-red-500 to-red-700",
      count: "25+ Products",
    },
    {
      icon: Hammer,
      title: "Workshop Tools",
      description: "Repair tools, welding equipment, and workshop gear",
      href: "/products?category=tools",
      color: "from-gray-500 to-gray-700",
      count: "120+ Products",
    },
    {
      icon: Wrench,
      title: "Spare Parts",
      description: "Genuine spare parts for all major brands",
      href: "/products?category=parts",
      color: "from-indigo-500 to-indigo-700",
      count: "500+ Products",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <Link key={index} href={category.href} className="group">
            <div className="card text-center group-hover:shadow-xl transition-all duration-300">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{category.description}</p>
              <div className="text-xs text-green-600 font-medium">{category.count}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
