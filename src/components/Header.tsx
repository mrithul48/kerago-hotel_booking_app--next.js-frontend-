
"use client";

import React, { useState } from 'react';
import { Hotel, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { authService } from '@/service/authService';
import { useRouter } from 'next/navigation';

interface HeaderList {
  title: string;
  url: string;
}

const HeaderList: HeaderList[] = [
  { title: 'Home', url: '/client/hotel' },
  { title: 'Orders', url: '/client/orders' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
const handleClickHome = ()=>{
  router.push("/")
}
  const handleClick = async (): Promise<void> => {

    try {
      const res = await authService.logout();
      console.log('Logout successful:', res);
    } catch (error) {
      console.error('Logout failed:', error);
    }

  };
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-900 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Hotel className="w-6 h-6 text-white" />
          </div>
          <span
          onClick={handleClickHome}
           className="text-2xl text-white font-bold cursor-pointer">Kerago</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">

          {HeaderList.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="relative text-white font-medium text-[15px] tracking-wide group"
            >
              <span className="transition-all duration-300 group-hover:text-blue-100">
                {item.title}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <button
            onClick={handleClick}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 cursor-pointer">
            Log out
          </button>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X className='text-white'/> : <Menu className='text-white'/>}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="fixed top-[65px] left-0 w-full flex flex-col items-center gap-6 py-6 bg-slate-950/95 backdrop-blur-lg  z-50 animate-slideDown  shadow-2xl">
          {HeaderList.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="text-white font-medium text-lg hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <button
            onClick={handleClick}
            className=" text-white px-6 py-2 rounded-[3] font-semibold bg-blue-500 hover:shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer "
          >
            Logout
          </button>
        </div>
      )}
    </nav>


  )
}

export default Header;

