"use client";
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, User, X, Check } from "lucide-react";
import { userService } from "@/service/userService";

export interface UserData {
  userId?: number;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
}

const AdminUserControl = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    userId: undefined,
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setLoading(false);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.adminRegister(formData);
      const newUser: UserData = {
        ...formData,
        userId: Math.max(...users.map(u => u.userId || 0)) + 1,
      };
      setUsers([...users, newUser]);
      setFormData({ userId: undefined, username: "", email: "", password: "", phone: "", role: "USER" });
      setShowForm(false);
      loadUsers();
    } catch (err) {
      console.error("Add user failed", err);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await userService.updateUser(selectedUser.userId!, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      setUsers(users.map(u => u.userId === selectedUser.userId ? 
        { ...u, username: formData.username, email: formData.email, phone: formData.phone, role: formData.role } 
        : u
      ));
      setSelectedUser(null);
      setFormData({ userId: undefined, username: "", email: "", password: "", phone: "", role: "USER" });
      setShowForm(false);
      loadUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteUser = async (id: number | undefined) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await userService.deleteUser(id!);
      setUsers(users.filter(u => u.userId !== id));
      loadUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      userId: undefined,
      username: user.username!,
      email: user.email!,
      password: "",
      phone: user.phone!,
      role: user.role!,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setFormData({ userId: undefined, username: "", email: "", password: "", phone: "", role: "USER" });
    setShowForm(false);
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <User className="text-indigo-600 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-500 text-sm mt-1">Manage system users and their roles</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setSelectedUser(null);
                setFormData({ userId: undefined, username: "", email: "", password: "", phone: "", role: "USER" });
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Add / Update Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedUser ? "Edit User" : "Add New User"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  {!selectedUser && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Password</label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Role</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={selectedUser ? handleUpdateUser : handleAddUser}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                  >
                    <Check size={20} />
                    {selectedUser ? "Update User" : "Add User"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by username or email..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              All Users <span className="text-gray-500 text-sm font-normal">({filteredUsers.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading users...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.userId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "ROLE_ADMIN" 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role === "ROLE_ADMIN" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(user)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Edit user"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.userId)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No users found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserControl;