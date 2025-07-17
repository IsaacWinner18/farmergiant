"use client";

import * as React from "react";
import {
  Save,
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Users,
  Target,
  Globe,
  Settings,
  Eye,
  EyeOff,
  Play,
  Pause,
} from "lucide-react";

interface CreateAdsProps {
  editingAds?: any;
  onClearEdit?: () => void;
  onAdsCreated?: () => void;
}

export function CreateAds({
  editingAds,
  onClearEdit,
  onAdsCreated,
}: CreateAdsProps) {
  const [formData, setFormData] = React.useState({
    title: editingAds?.title || "",
    description: editingAds?.description || "",
    image: editingAds?.image || "",
    status: editingAds?.status || "draft",
    budget: editingAds?.budget || "",
    startDate: editingAds?.startDate || "",
    endDate: editingAds?.endDate || "",
    targetAudience: editingAds?.targetAudience || [],
    category: editingAds?.category || "",
    cpc: editingAds?.cpc || "",
    cpm: editingAds?.cpm || "",
    url: editingAds?.url || "",
    isActive: editingAds?.isActive || false,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [newAudience, setNewAudience] = React.useState("");

  const categories = [
    "Templates",
    "Business",
    "E-commerce",
    "Technology",
    "Design",
    "Development",
    "Marketing",
    "Education",
  ];

  const audienceOptions = [
    "Developers",
    "Designers",
    "Business Owners",
    "Entrepreneurs",
    "Agencies",
    "E-commerce",
    "Online Stores",
    "Startups",
    "Freelancers",
    "Students",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Valid budget is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) >= new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const url = editingAds
        ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/ads/${editingAds.id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URI}/api/ads`;

      const method = editingAds ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save ad");
      }

      onAdsCreated?.();
    } catch (error: any) {
      console.error("Error saving ad:", error);
      setErrors({ submit: error.message || "Failed to save ad" });
    } finally {
      setIsLoading(false);
    }
  };

  const addAudience = () => {
    if (
      newAudience.trim() &&
      !formData.targetAudience.includes(newAudience.trim())
    ) {
      handleInputChange("targetAudience", [
        ...formData.targetAudience,
        newAudience.trim(),
      ]);
      setNewAudience("");
    }
  };

  const removeAudience = (index: number) => {
    handleInputChange(
      "targetAudience",
      formData.targetAudience.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {editingAds ? "Edit Ad Campaign" : "Create New Ad Campaign"}
          </h2>
          <p className="text-green-300 mt-2">
            {editingAds
              ? "Update your advertising campaign"
              : "Create a new advertising campaign to promote your products"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClearEdit}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Campaign Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-300 text-sm font-medium mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      errors.title
                        ? "border-red-500"
                        : "border-green-500/30 focus:border-green-400"
                    }`}
                    placeholder="Enter campaign title"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-green-300 text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className={`w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                      errors.description
                        ? "border-red-500"
                        : "border-green-500/30 focus:border-green-400"
                    }`}
                    placeholder="Describe your advertising campaign"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Budget (NGN) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) =>
                          handleInputChange("budget", e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                          errors.budget
                            ? "border-red-500"
                            : "border-green-500/30 focus:border-green-400"
                        }`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.budget && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.budget}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                        errors.category
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-green-300 text-sm font-medium mb-2">
                    Landing Page URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    className="w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                    placeholder="https://example.com/landing-page"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Settings */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Campaign Settings
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                        errors.startDate
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                        errors.endDate
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Cost Per Click (NGN)
                    </label>
                    <input
                      type="number"
                      value={formData.cpc}
                      onChange={(e) => handleInputChange("cpc", e.target.value)}
                      className="w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Cost Per Mille (NGN)
                    </label>
                    <input
                      type="number"
                      value={formData.cpm}
                      onChange={(e) => handleInputChange("cpm", e.target.value)}
                      className="w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Active Campaign</p>
                    <p className="text-green-300 text-sm">
                      Start the campaign immediately
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("isActive", !formData.isActive)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isActive ? "bg-green-500" : "bg-green-500/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Target Audience */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Target Audience
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    className="flex-1 px-4 py-2 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="">Select audience</option>
                    {audienceOptions.map((audience) => (
                      <option key={audience} value={audience}>
                        {audience}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addAudience}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.targetAudience.map(
                    (audience: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20"
                      >
                        <span className="text-white">{audience}</span>
                        <button
                          type="button"
                          onClick={() => removeAudience(index)}
                          className="p-1 hover:bg-red-500/20 rounded-lg text-red-300 hover:text-red-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Ad Creative */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Ad Creative
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-300 text-sm font-medium mb-2">
                    Ad Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                    placeholder="https://example.com/ad-image.jpg"
                  />
                </div>

                {formData.image && (
                  <div className="w-full h-48 bg-green-500/20 rounded-xl border border-green-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-green-400 mx-auto mb-2" />
                      <p className="text-green-300 text-sm">
                        Ad preview will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Status */}
            <div className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Campaign Status
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-green-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-green-300 text-sm">
                  {formData.status === "active" && (
                    <Play className="w-4 h-4 text-green-400" />
                  )}
                  {formData.status === "paused" && (
                    <Pause className="w-4 h-4 text-yellow-400" />
                  )}
                  {formData.status === "draft" && (
                    <Calendar className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="capitalize">{formData.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-green-500/20">
          <div className="text-green-300 text-sm">
            {editingAds
              ? "Update your advertising campaign"
              : "Create a new advertising campaign"}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClearEdit}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingAds ? "Update Campaign" : "Create Campaign"}
                </>
              )}
            </button>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400">{errors.submit}</p>
          </div>
        )}
      </form>
    </div>
  );
}
