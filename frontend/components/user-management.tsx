"use client";

import * as React from "react";
import {
  Edit,
  Save,
  X,
  Search,
  User,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  purchasedProduct: string[];
  purchasedCourse: string[];
  role: "user" | "admin";
  verified: boolean;
  otp?: number;
  resetOtp?: number;
  createdAt?: string;
}

export function UserManagement() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editingUser, setEditingUser] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<{ [key: string]: string }>(
    {}
  );
  const [updatingUser, setUpdatingUser] = React.useState<string | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "Access denied. Admin privileges required. Please log in as an admin user."
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Update user via API
  const updateUser = async (userId: string, field: string, value: any) => {
    try {
      setUpdatingUser(userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "Access denied. Admin privileges required. Please log in as an admin user."
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Update local state with the updated user
        setUsers(users.map((user) => (user._id === userId ? data.data : user)));
      } else {
        throw new Error(data.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setUpdatingUser(null);
    }
  };

  // Fetch users on component mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId: string) => {
    setEditingUser(userId);
  };

  const handleSave = async (userId: string) => {
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const setUserTab = (userId: string, tab: string) => {
    setActiveTab({ ...activeTab, [userId]: tab });
  };

  const getUserTab = (userId: string) => {
    return activeTab[userId] || "details";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-green-300">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">User Management</h2>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">User Management</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 pl-12 pr-4 py-3 bg-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
          />
        </div>
      </div>

      {/* Users Count */}
      <div className="text-green-300">
        Total Users: {users.length} | Showing: {filteredUsers.length}
      </div>

      {/* Users Grid */}
      <div className="space-y-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-green-400 text-lg">
              {searchTerm
                ? "No users found matching your search."
                : "No users found."}
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-gradient-to-br from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl border border-green-500/20 shadow-xl overflow-hidden"
            >
              {/* User Header */}
              <div className="p-6 border-b border-green-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {user.name}
                      </h3>
                      <p className="text-green-300">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.verified
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {user.verified ? "Verified" : "Unverified"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30 capitalize">
                      {user.role}
                    </span>
                    {editingUser === user._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(user._id)}
                          disabled={updatingUser === user._id}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                        >
                          {updatingUser === user._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4">
                <div className="flex gap-1 bg-green-900/30 rounded-xl p-1">
                  {["details", "products", "courses"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setUserTab(user._id, tab)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        getUserTab(user._id) === tab
                          ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg"
                          : "text-green-300 hover:text-white hover:bg-green-500/20"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {getUserTab(user._id) === "details" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-green-300 text-sm font-medium mb-2">
                          Name
                        </label>
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            value={user.name}
                            onChange={(e) =>
                              updateUser(user._id, "name", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-green-900/30 border border-green-500/30 rounded-xl text-white placeholder-green-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                          />
                        ) : (
                          <p className="text-white font-medium">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-green-300 text-sm font-medium mb-2">
                          Email
                        </label>
                        {editingUser === user._id ? (
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                              updateUser(user._id, "email", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-green-900/30 border border-green-500/30 rounded-xl text-white placeholder-green-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                          />
                        ) : (
                          <p className="text-white font-medium">{user.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-green-300 text-sm font-medium mb-2">
                          Role
                        </label>
                        {editingUser === user._id ? (
                          <select
                            value={user.role}
                            onChange={(e) =>
                              updateUser(user._id, "role", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-green-900/30 border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <p className="text-white font-medium capitalize">
                            {user.role}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-green-300 text-sm font-medium mb-2">
                          Verified Status
                        </label>
                        {editingUser === user._id ? (
                          <button
                            onClick={() =>
                              updateUser(user._id, "verified", !user.verified)
                            }
                            disabled={updatingUser === user._id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                              user.verified
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {updatingUser === user._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : user.verified ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            {user.verified ? "Verified" : "Unverified"}
                          </button>
                        ) : (
                          <div
                            className={`flex items-center gap-2 ${
                              user.verified ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {user.verified ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            <span>
                              {user.verified ? "Verified" : "Unverified"}
                            </span>
                          </div>
                        )}
                      </div>

                      {user.otp && (
                        <div>
                          <label className="block text-green-300 text-sm font-medium mb-2">
                            OTP
                          </label>
                          <p className="text-white font-mono bg-green-900/30 px-4 py-2 rounded-lg border border-green-500/30">
                            {user.otp}
                          </p>
                        </div>
                      )}

                      {user.createdAt && (
                        <div>
                          <label className="block text-green-300 text-sm font-medium mb-2">
                            Created At
                          </label>
                          <p className="text-white font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {getUserTab(user._id) === "products" && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">
                      Purchased Products ({user.purchasedProduct.length})
                    </h4>
                    {user.purchasedProduct.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.purchasedProduct.map((product, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-sm"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-400">No products purchased</p>
                    )}
                  </div>
                )}

                {getUserTab(user._id) === "courses" && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">
                      Purchased Courses ({user.purchasedCourse.length})
                    </h4>
                    {user.purchasedCourse.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.purchasedCourse.map((course, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-400">No courses purchased</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
