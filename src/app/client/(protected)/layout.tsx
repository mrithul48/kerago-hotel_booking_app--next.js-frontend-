"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/Header";
import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute role="ROLE_USER">
      <Header />
      <main>{children}</main>
    </ProtectedRoute>
  );
};

export default UserLayout;
