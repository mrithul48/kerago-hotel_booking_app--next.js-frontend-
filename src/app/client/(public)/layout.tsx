"use client";


import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingHeader from "@/components/LandingHeader";
import React, { ReactNode, useEffect, useState } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: check if user token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
    setLoading(false); // done checking
  }, []);

  // Optional: prevent flicker before auth check
  if (loading) return null;

  return (
    <div>
      {authenticate ? <Header /> : <LandingHeader />}
      <main>{children}</main>
    <Footer/>
    </div>
  );
};

export default UserLayout;
