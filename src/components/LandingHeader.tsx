"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  Contact,
  Hotel,
  House,
  LucideIcon,
  Menu,
  X,
  LogIn,
  FilePen,
} from "lucide-react";
import AuthModal from "./ui/authModel";
import Register from "./ui/RegisterModel";

interface MenuType {
  title: string;
  url: string;
  icon: LucideIcon;
}

const menuList: MenuType[] = [
  { title: "Home", url: "/", icon: Hotel },
  { title: "Hotels", url: "/client/hotel", icon: House },
  { title: "About", url: "/about", icon: Book },
  { title: "Contact", url: "/contact", icon: Contact },
];

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setRegister] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-[#EEEEEE] shadow z-40">
        <div className="flex justify-between items-center px-5 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-[18px] font-bold text-black hover:text-[#65655c]"
          >
            Kerago<span className="text-blue-500 text-[12px]">.com</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-black text-[15px] font-bold ps-20">
            {menuList.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className="hover:text-[#65655c] transition"
              >
                {title}
              </Link>
            ))}
          </nav>

          {/* Desktop Login/Register */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => setShowAuth(true)}
              className="bg-[#777C6D] text-white transition w-20 py-1 text-[14px] font-bold cursor-pointer rounded-[5px] hover:bg-[#4a4c47]"
            >
              Login
            </button>
            <button
              onClick={() => setRegister(true)}
              className="bg-[#777C6D] text-white transition w-20 py-1 text-[14px] font-bold cursor-pointer rounded-[5px] hover:bg-[#4a4c47]"
            >
              Sign in
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div className="md:hidden bg-[#EEEEEE]">
            <nav className="flex flex-col items-start text-black font-medium">
              {menuList.map(({ title, url, icon: Icon }, index) => (
                <Link
                  key={index}
                  href={url}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 px-5 hover:bg-[#8d8d86] w-full py-4"
                >
                  <Icon size={18} className="text-black" />
                  {title}
                </Link>
              ))}

              {/* Login */}
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setShowAuth(true);
                }}
                className="flex items-center gap-3 px-5 hover:bg-[#8d8d86] w-full py-4 text-black"
              >
                <LogIn size={18} />
                Login
              </button>

              {/* Sign In */}
              <button
                onClick={() => {
                  setMobileMenu(false);
                  setRegister(true);
                }}
                className="flex items-center gap-3 px-5 hover:bg-[#8d8d86] w-full py-4 text-black"
              >
                <FilePen size={18} />
                Sign in
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div
          className="fixed inset-0  flex items-center justify-center z-50"
          onClick={() => setShowAuth(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AuthModal />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setRegister(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Register onClose={() => setRegister(false)} />
          </div>
        </div>
      )}
    </>
  );
}

