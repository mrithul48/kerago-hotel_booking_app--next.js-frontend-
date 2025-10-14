"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, Users, Hotel, Calendar, IndianRupee } from "lucide-react";
import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { statusService } from "@/service/statusService";

interface StatusData {
  totalHotel: number;
  totalUser: number;
  totalBooking: number;
  totalRevenue: number;
}
interface StateCard{
  icon: React.ReactNode;
  title: string;
  value: number;
}
const DashBoard: React.FC = () => {
  const [adminName, setAdminName] = useState<string>("");
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("username");
      if (username) setAdminName(username);
    }
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
     
    const res = await statusService.getStatus();
    setStatus(res)
 
    } catch (error) {
      console.error("Error fetching status:", error);
      alert("Failed to get status");
    } finally {
      setLoading(false);
    }
  };

  const data = [
    { name: "Hotels", value: status?.totalHotel || 0 },
    { name: "Users", value: status?.totalUser || 0 },
    { name: "Bookings", value: status?.totalBooking || 0 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

  const StatCard = ({ icon, title, value }: StateCard) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">{icon}</div>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back&lsquo; <span className="text-indigo-600">{adminName || "Admin"}</span>
              </h1>
              <p className="text-gray-500 mt-2">
                Here&apos;s your hotel booking system overview
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-gray-500 text-sm">Last updated</p>
                <p className="text-gray-900 font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<Hotel className="text-indigo-600 w-6 h-6" />}
                title="Total Hotels"
                value={status?.totalHotel ?? 0}
              />
              <StatCard
                icon={<Users className="text-emerald-600 w-6 h-6" />}
                title="Total Users"
                value={status?.totalUser ?? 0}
              />
              <StatCard
                icon={<Calendar className="text-amber-600 w-6 h-6" />}
                title="Total Bookings"
                value={status?.totalBooking ?? 0}
              />
              <StatCard
                icon={<IndianRupee className="text-purple-600 w-6 h-6" />}
                title="Total Revenue"
                value={status?.totalRevenue ?? 0}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pie Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <TrendingUp className="text-indigo-600 w-5 h-5" />
                    </div>
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Distribution of key metrics</p>
                </div>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: string) => value.toLocaleString()}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Summary</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      Hotels
                    </span>
                    <span className="font-bold text-gray-900">{status?.totalHotel ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                      Users
                    </span>
                    <span className="font-bold text-gray-900">{status?.totalUser ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                      Bookings
                    </span>
                    <span className="font-bold text-gray-900">{status?.totalBooking ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      Revenue
                    </span>
                    <span className="font-bold text-gray-900">₹{(status?.totalRevenue ?? 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoard;