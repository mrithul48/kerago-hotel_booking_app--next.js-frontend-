"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Users, Building2, Calendar, LayoutDashboard } from "lucide-react";
import { authService } from "@/service/authService";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "DashBoard", href: "/admin/dashboard", icon: LayoutDashboard},
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Hotels", href: "/admin/hotel", icon: Building2 },
    { label: "Booking", href: "/admin/booking", icon: Calendar }
    
  ];

  const handleClick = async (): Promise<void> => {
    try {
      const res = await authService.logout();
      console.log("log out success", res);
    } catch (error) {
      console.log("log out failed", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 bg-white shadow-lg h-screen
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col gap-6 pt-4">
          {/* Header */}
          <div className="flex justify-center items-center border-b pb-4 px-4">
            <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col px-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="border-t">
          <button
            onClick={handleClick}
            className="
              w-full flex items-center justify-center gap-2
              py-4 px-4 bg-blue-600 text-white font-medium
              hover:bg-blue-700 active:bg-blue-800
              transition-colors duration-200
            "
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;