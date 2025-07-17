"use client";

import * as React from "react";
import {
  Edit,
  Eye,
  Search,
  Plus,
  Trash2,
  Play,
  Pause,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Filter,
  MoreVertical,
  ArrowUpDown,
} from "lucide-react";

interface AdsManagementProps {
  onEditAds?: (ads: any) => void;
  onAdsCreated?: () => void;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "active" | "paused" | "draft";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string;
  targetAudience: string[];
  category: string;
}

export function AdsManagement({ onEditAds, onAdsCreated }: AdsManagementProps) {
  const [ads, setAds] = React.useState<Ad[]>([
    {
      id: "1",
      title: "Premium Template Promotion",
      description:
        "Promote our premium website templates to developers and designers",
      image: "/placeholder.jpg",
      status: "active",
      budget: 50000,
      spent: 32450,
      impressions: 15420,
      clicks: 892,
      ctr: 5.8,
      cpc: 36.4,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      targetAudience: ["Developers", "Designers", "Agencies"],
      category: "Templates",
    },
    {
      id: "2",
      title: "Business Solutions Campaign",
      description:
        "Target business owners looking for professional website solutions",
      image: "/placeholder.jpg",
      status: "active",
      budget: 75000,
      spent: 45680,
      impressions: 22340,
      clicks: 1245,
      ctr: 5.6,
      cpc: 36.7,
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      targetAudience: ["Business Owners", "Entrepreneurs"],
      category: "Business",
    },
    {
      id: "3",
      title: "E-commerce Special Offer",
      description: "Promote e-commerce templates with special pricing",
      image: "/placeholder.jpg",
      status: "paused",
      budget: 30000,
      spent: 18900,
      impressions: 9870,
      clicks: 567,
      ctr: 5.7,
      cpc: 33.3,
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      targetAudience: ["E-commerce", "Online Stores"],
      category: "E-commerce",
    },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("date");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "paused":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "draft":
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
      default:
        return "text-purple-400 bg-purple-500/10 border-purple-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return Play;
      case "paused":
        return Pause;
      case "draft":
        return Calendar;
      default:
        return Calendar;
    }
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || ad.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedAds = [...filteredAds].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case "date":
        aValue = new Date(a.startDate);
        bValue = new Date(b.startDate);
        break;
      case "budget":
        aValue = a.budget;
        bValue = b.budget;
        break;
      case "spent":
        aValue = a.spent;
        bValue = b.spent;
        break;
      case "impressions":
        aValue = a.impressions;
        bValue = b.impressions;
        break;
      case "clicks":
        aValue = a.clicks;
        bValue = b.clicks;
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleStatusToggle = (adId: string) => {
    setAds(
      ads.map((ad) => {
        if (ad.id === adId) {
          const newStatus = ad.status === "active" ? "paused" : "active";
          return { ...ad, status: newStatus };
        }
        return ad;
      })
    );
  };

  const handleEditAd = (ad: Ad) => {
    onEditAds?.(ad);
  };

  const handleDeleteAd = (adId: string) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds(ads.filter((ad) => ad.id !== adId));
    }
  };

  const totalBudget = ads.reduce((sum, ad) => sum + ad.budget, 0);
  const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Ads Management</h2>
          <p className="text-purple-300 mt-2">
            Manage your advertising campaigns and track performance
          </p>
        </div>
        <button
          onClick={() => onEditAds?.({})}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Create New Ad
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-white mt-2">
                {formatPrice(totalBudget)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-white mt-2">
                {formatPrice(totalSpent)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">
                Total Impressions
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                {formatNumber(totalImpressions)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-white mt-2">
                {formatNumber(totalClicks)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
            <input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
            >
              <option value="all">All Categories</option>
              <option value="Templates">Templates</option>
              <option value="Business">Business</option>
              <option value="E-commerce">E-commerce</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split("-");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder as "asc" | "desc");
              }}
              className="px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="budget-desc">Budget (High to Low)</option>
              <option value="budget-asc">Budget (Low to High)</option>
              <option value="spent-desc">Spent (High to Low)</option>
              <option value="spent-asc">Spent (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ads List */}
      <div className="space-y-4">
        {sortedAds.map((ad) => {
          const StatusIcon = getStatusIcon(ad.status);
          const budgetUsed = (ad.spent / ad.budget) * 100;

          return (
            <div
              key={ad.id}
              className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Ad Image */}
                <div className="w-32 h-24 bg-green-500/20 rounded-xl border border-green-500/30 flex items-center justify-center">
                  <div className="text-green-300 text-sm">Ad Image</div>
                </div>

                {/* Ad Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {ad.title}
                      </h3>
                      <p className="text-green-300 mt-1">{ad.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            ad.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {ad.status.charAt(0).toUpperCase() +
                            ad.status.slice(1)}
                        </span>
                        <span className="text-green-300 text-sm">
                          {ad.category}
                        </span>
                        <span className="text-green-300 text-sm">
                          {new Date(ad.startDate).toLocaleDateString()} -{" "}
                          {new Date(ad.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusToggle(ad.id)}
                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-white transition-colors"
                      >
                        {ad.status === "active" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditAd(ad)}
                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <p className="text-green-300 text-sm">Budget</p>
                      <p className="text-white font-semibold">
                        {formatPrice(ad.budget)}
                      </p>
                      <div className="w-full bg-green-500/20 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-green-300 text-xs mt-1">
                        {budgetUsed.toFixed(1)}% used
                      </p>
                    </div>

                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <p className="text-green-300 text-sm">Spent</p>
                      <p className="text-white font-semibold">
                        {formatPrice(ad.spent)}
                      </p>
                    </div>

                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <p className="text-green-300 text-sm">Impressions</p>
                      <p className="text-white font-semibold">
                        {formatNumber(ad.impressions)}
                      </p>
                    </div>

                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <p className="text-green-300 text-sm">Clicks</p>
                      <p className="text-white font-semibold">
                        {formatNumber(ad.clicks)}
                      </p>
                      <p className="text-green-300 text-xs">CTR: {ad.ctr}%</p>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 text-sm">Target:</span>
                    {ad.targetAudience.map((audience, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-500/20 rounded-lg text-green-300 text-xs"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {sortedAds.length === 0 && (
          <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-12 border border-green-500/20 shadow-xl text-center">
            <div className="text-green-300 text-lg">
              No ads found matching your criteria
            </div>
            <p className="text-green-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
