"use client";

import * as React from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Download,
  Calendar,
  Filter,
} from "lucide-react";

export function Analytics() {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [isLoading, setIsLoading] = React.useState(false);
  const [analyticsData, setAnalyticsData] = React.useState({
    overview: {
      totalRevenue: 2450000,
      totalOrders: 1247,
      totalUsers: 892,
      conversionRate: 3.2,
    },
    revenue: {
      current: 2450000,
      previous: 1980000,
      growth: 23.7,
    },
    orders: {
      current: 1247,
      previous: 987,
      growth: 26.3,
    },
    users: {
      current: 892,
      previous: 654,
      growth: 36.4,
    },
    topProducts: [
      { name: "Premium Template", sales: 234, revenue: 468000 },
      { name: "Business Template", sales: 189, revenue: 378000 },
      { name: "E-commerce Template", sales: 156, revenue: 312000 },
      { name: "Portfolio Template", sales: 134, revenue: 268000 },
      { name: "Blog Template", sales: 98, revenue: 196000 },
    ],
    recentActivity: [
      {
        type: "purchase",
        user: "John Doe",
        product: "Premium Template",
        amount: 2000,
        time: "2 hours ago",
      },
      {
        type: "purchase",
        user: "Jane Smith",
        product: "Business Template",
        amount: 2000,
        time: "4 hours ago",
      },
      {
        type: "purchase",
        user: "Mike Johnson",
        product: "E-commerce Template",
        amount: 2000,
        time: "6 hours ago",
      },
      {
        type: "purchase",
        user: "Sarah Wilson",
        product: "Portfolio Template",
        amount: 2000,
        time: "8 hours ago",
      },
    ],
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-400" : "text-red-400";
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-green-300 mt-2">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-10 pr-8 py-2 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatPrice(analyticsData.overview.totalRevenue)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {React.createElement(
                  getGrowthIcon(analyticsData.revenue.growth),
                  {
                    className: `w-4 h-4 ${getGrowthColor(
                      analyticsData.revenue.growth
                    )}`,
                  }
                )}
                <span
                  className={`text-sm ${getGrowthColor(
                    analyticsData.revenue.growth
                  )}`}
                >
                  +{analyticsData.revenue.growth}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatNumber(analyticsData.overview.totalOrders)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {React.createElement(
                  getGrowthIcon(analyticsData.orders.growth),
                  {
                    className: `w-4 h-4 ${getGrowthColor(
                      analyticsData.orders.growth
                    )}`,
                  }
                )}
                <span
                  className={`text-sm ${getGrowthColor(
                    analyticsData.orders.growth
                  )}`}
                >
                  +{analyticsData.orders.growth}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatNumber(analyticsData.overview.totalUsers)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {React.createElement(
                  getGrowthIcon(analyticsData.users.growth),
                  {
                    className: `w-4 h-4 ${getGrowthColor(
                      analyticsData.users.growth
                    )}`,
                  }
                )}
                <span
                  className={`text-sm ${getGrowthColor(
                    analyticsData.users.growth
                  )}`}
                >
                  +{analyticsData.users.growth}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">
                Conversion Rate
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {analyticsData.overview.conversionRate}%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+0.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
            <div className="flex items-center gap-2 text-green-300 text-sm">
              <Calendar className="w-4 h-4" />
              {timeRange === "7d"
                ? "Last 7 days"
                : timeRange === "30d"
                ? "Last 30 days"
                : timeRange === "90d"
                ? "Last 90 days"
                : "Last year"}
            </div>
          </div>
          <div className="h-64 bg-green-900/20 rounded-xl border border-green-500/20 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-300">
                Chart visualization will be implemented here
              </p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-green-300 text-sm">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {formatPrice(product.revenue)}
                  </p>
                  <p className="text-green-300 text-sm">
                    {product.sales} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {analyticsData.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {activity.user} purchased {activity.product}
                </p>
                <p className="text-green-300 text-sm">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {formatPrice(activity.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
