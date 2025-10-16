"use client";

import React from 'react';

const Footer = () => {
  const textClass = 'text-white';
  const mutedClass = 'text-white';
  const borderClass = 'border-white';

  return (
    <footer className={`bg-[#292a27] border-t ${borderClass} pt-8 px-5`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-2  gap-5 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl text-white font-bold">Kerago</span>
            </div>
            <p className="text-white text-[13px]">Premium hotel booking platform for modern travelers.</p>
          </div>

          {[
            { title: "Product", links: ["Features", "Hotels", "Pricing", "API"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] }
          ].map((col, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-2">{col.title}</h3>
              <ul className="space-y-1">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className={`${mutedClass} hover:${textClass} transition-colors hover:underline text-[12px]`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t ${borderClass} pt-4 pb-5 flex flex-col md:flex-row justify-between items-center `}>
          <p className="text-[12px] text-white">© 2025 Kerago. All rights reserved.</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
              <a key={i} href="#" className={`${mutedClass} hover:${textClass} transition-colors text-[12px]`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
