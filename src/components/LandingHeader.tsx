"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthModal from "./ui/authModel";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Kerago<span className="text-blue-500">.com</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/client/hotel" className="hover:text-white transition">
              Hotels
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </nav>

          {/* Login/Register Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-teal-500 to-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              Login / Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <nav className="flex flex-col items-center py-4 space-y-3 text-gray-200 font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-400"
              >
                Home
              </Link>
              <Link
                href="/hotels"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-400"
              >
                Hotels
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-400"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenu(false)}
                className="hover:text-blue-400"
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setShowAuth(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
              >
                Login / Register
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <AuthModal/>
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAuth(false)}
          ></div>
        </div>
      )}
    </>
  );
}
