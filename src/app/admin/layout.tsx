"use client";

import AdminSidebar from "@/components/AdminSideBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { ReactNode } from "react";


interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute role="ROLE_ADMIN">
    <div className="min-h-screen flex">
      <AdminSidebar/>
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
