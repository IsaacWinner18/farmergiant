"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Home,
  LayoutTemplate,
  Plus,
  Settings,
  Users,
  DollarSign,
  Menu,
  X,
} from "lucide-react";
import { UserManagement } from "./user-management";
import { ProductManagement } from "./product-management";
import { AdsManagement } from "./ads-management";
import { Analytics } from "./analytics";
import { CreateProduct } from "./create-product";
import { CreateAds } from "./create-ads";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: Home, id: "dashboard" },
      { title: "Analytics", icon: BarChart3, id: "analytics" },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Users", icon: Users, id: "users" },
      { title: "Products", icon: LayoutTemplate, id: "products" },
      { title: "Ads", icon: BookOpen, id: "ads" },
    ],
  },
  {
    title: "Create",
    items: [
      { title: "New Product", icon: Plus, id: "create-product" },
      { title: "New Ads", icon: Plus, id: "create-ads" },
    ],
  },
  {
    title: "Settings",
    items: [{ title: "General", icon: Settings, id: "settings" }],
  },
];

export function AdminDashboard() {
  const [activeSection, setActiveSection] = React.useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any>(null);
  const [editingAds, setEditingAds] = React.useState<any>(null);
  const [productRefreshKey, setProductRefreshKey] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //     const checkAdminAuth = async () => {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/verify`,
  //           {
  //             method: "GET",
  //             credentials: "include", // This ensures cookies are sent
  //           }
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           setIsAuthenticated(true);
  //         } else {
  //           const errorData = await response.json();
  //           // Redirect to login if not authenticated
  //           router.push("/login");
  //         }
  //       } catch (error) {
  //         console.error("Auth check failed:", error);
  //         router.push("/login");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     checkAdminAuth();
  //   }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Temporarily bypass authentication for development
  // if (!isAuthenticated) {
  //   return null; // Will redirect to login
  // }

  const refreshProducts = () => {
    setProductRefreshKey((prev) => prev + 1);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setActiveSection("create-product");
    setSidebarOpen(false);
  };

  const handleEditAds = (ads: any) => {
    setEditingAds(ads);
    setActiveSection("create-ads");
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardOverview
            onNavigateToSection={(section: string) => setActiveSection(section)}
          />
        );
      case "analytics":
        return <Analytics />;
      case "users":
        return <UserManagement />;
      case "products":
        return (
          <ProductManagement
            onEditProduct={handleEditProduct}
            onProductSaved={() => {
              // Refresh products when a product is saved
              setActiveSection("products");
            }}
          />
        );
      case "ads":
        return (
          <AdsManagement
            key={productRefreshKey}
            onEditAds={handleEditAds}
            onAdsCreated={refreshProducts}
          />
        );
      case "create-product":
        return (
          <CreateProduct
            editingProduct={editingProduct}
            onClearEdit={() => setEditingProduct(null)}
            onProductSaved={() => {
              // Refresh products when a product is saved
              setActiveSection("products");
            }}
          />
        );
      case "create-ads":
        return (
          <CreateAds
            editingAds={editingAds}
            onClearEdit={() => setEditingAds(null)}
            onAdsCreated={() => {
              // Refresh ads list when a new ads is created
              setActiveSection("ads");
            }}
          />
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-teal-900/20 to-emerald-900/20 backdrop-blur-sm"></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-green-900/30 via-teal-900/30 to-emerald-900/30 backdrop-blur-xl border-r border-green-500/20 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutTemplate className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-green-200 text-sm">Metavatech</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-green-500/20 text-green-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-120px)]">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                      // Clear editing states when switching sections
                      if (item.id !== "create-product") setEditingProduct(null);
                      if (item.id !== "create-ads") setEditingAds(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-white shadow-lg border border-green-400/30"
                        : "text-green-200 hover:text-white hover:bg-green-500/20"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80 relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl border-b border-green-500/20 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-200 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-green-500/30 lg:hidden" />
            <h1 className="text-2xl font-bold text-white capitalize">
              {editingProduct
                ? `Edit Product: ${editingProduct.title}`
                : editingAds
                ? `Edit Ads: ${editingAds.title}`
                : activeSection.replace("-", " ")}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="md:p-6 p-2">{renderContent()}</main>
      </div>
    </div>
  );
}

function DashboardOverview({
  onNavigateToSection,
}: {
  onNavigateToSection?: (section: string) => void;
}) {
  const [dashboardData, setDashboardData] = useState({
    users: { total: 0, growth: 0 },
    revenue: { total: 0, growth: 0 },
    productSales: { total: 0, growth: 0 },
    adSales: { total: 0, growth: 0 },
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/dashboard/stats`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data.data);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? "+" : "";
    const color = growth >= 0 ? "text-green-400" : "text-red-400";
    return (
      <span className={`${color} text-sm mt-1`}>
        {sign}
        {growth.toFixed(1)}% from last month
      </span>
    );
  };

  const getActivityIcon = (activity: any) => {
    if (activity.productSlug?.includes("template")) {
      return <LayoutTemplate className="w-4 h-4" />;
    }
    return <BookOpen className="w-4 h-4" />;
  };

  const getActivityColor = (activity: any) => {
    if (activity.productSlug?.includes("template")) {
      return "bg-blue-500";
    }
    return "bg-green-500";
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl animate-pulse"
            >
              <div className="h-8 bg-green-500/20 rounded mb-2"></div>
              <div className="h-12 bg-green-500/20 rounded mb-2"></div>
              <div className="h-4 bg-green-500/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Stats Grid */}
      <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-white mt-2">
                {dashboardData.users.total.toLocaleString()}
              </p>
              {formatGrowth(dashboardData.users.growth)}
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">
                Products Sold
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {dashboardData.productSales.total.toLocaleString()}
              </p>
              {formatGrowth(dashboardData.productSales.growth)}
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center">
              <LayoutTemplate className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Ads Sold</p>
              <p className="text-3xl font-bold text-white mt-2">
                {dashboardData.adSales.total.toLocaleString()}
              </p>
              {formatGrowth(dashboardData.adSales.growth)}
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatPrice(dashboardData.revenue.total)}
              </p>
              {formatGrowth(dashboardData.revenue.growth)}
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-1 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {dashboardData.recentActivity.length > 0 ? (
              dashboardData.recentActivity.map(
                (activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20"
                  >
                    <div
                      className={`w-3 h-3 ${getActivityColor(
                        activity
                      )} rounded-full`}
                    ></div>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {activity.productSlug?.includes("template")
                          ? "Product purchased"
                          : "Ads purchased"}
                      </p>
                      <p className="text-green-300 text-sm">
                        {activity.productTitle} -{" "}
                        {activity.userId?.name || activity.userEmail}
                      </p>
                      <p className="text-green-400 text-xs">
                        {new Date(activity.purchaseDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {formatPrice(activity.amount)}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-green-300">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-green-900/40 via-teal-900/40 to-emerald-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => {
                onNavigateToSection?.("create-product");
              }}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Product
            </button>
            <button
              onClick={() => {
                onNavigateToSection?.("create-ads");
              }}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Ads
            </button>
            <button
              onClick={() => {
                onNavigateToSection?.("analytics");
              }}
              className="w-full flex items-center gap-3 p-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-200 hover:text-white font-medium transition-all duration-200"
            >
              <BarChart3 className="w-5 h-5" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
