
"use client";

import React, { useState } from 'react';
import { CircleUserRound, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { authService } from '@/service/authService';


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

  const handleClick = async (): Promise<void> => {

    try {
      const res = await authService.logout();
      console.log('Logout successful:', res);
    } catch (error) {
      console.error('Logout failed:', error);
    }

  };
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 shadow bg-[#EEEEEE] ">
      <div className=" px-5 py-4 flex items-center justify-between ">
        <div className="flex items-center  ">
          <Link
            href="/"
            className="text-[18px] font-bold text-black hover:text-[#65655c]"
          >
            Kerago<span className="text-blue-500 text-[12px]">.com</span>
          </Link>
        </div>

        {/* <div className="hidden md:flex items-center  space-x-8 bg-amber-400"> */}
          <div className="hidden md:flex items-center  space-x-5 ">
            {HeaderList.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="relative text-black font-medium text-[15px] tracking-wide group"
              >
                <span className="transition-all duration-300 font-bold hover:text-[#65655c]">
                  {item.title}
                </span>
                {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#65655c] transition-all duration-300 group-hover:w-full"></span> */}
              </Link>
            ))}
          </div>
          <div className='hidden md:flex items-center gap-3'>
            <div>
              <CircleUserRound size={20}/>
            </div>
            <div>
                 <button
              onClick={handleClick}
              className="bg-[#777C6D] text-white transition w-20 py-1 text-[14px] font-bold cursor-pointer rounded-[5px] hover:bg-[#4a4c47]">
              Log out
            </button>
            </div>
            
          </div>
        {/* </div> */}

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X className='text-black cursor-pointer' /> : <Menu className='text-black cursor-pointer' />}
        </button>


      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full flex flex-col items-start bg-[#EEEEEE]   z-50 shadow ">
          {HeaderList.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="text-black  font-medium w-full hover:bg-[#8d8d86]  py-4 px-5  transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <button
            onClick={handleClick}
            className=" text-black px-5 py-4 rounded-[3] hover:bg-[#8d8d86] w-full text-start    cursor-pointer "
          >
            Logout
          </button>
         
           
        </div>
      )}
    </nav>


  )
}

export default Header;

