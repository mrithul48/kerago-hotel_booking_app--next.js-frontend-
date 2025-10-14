"use client";

import { Hotel } from 'lucide-react';
import React from 'react';

const Footer = () => {
  const bgClass = 'bg-slate-900';
  const textClass = 'text-white';
  const mutedClass = 'text-white';
  const borderClass = 'border-slate-800';

  return (
    <footer className={`${bgClass} border-t ${borderClass} pt-8 px-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-white font-bold">Kerago</span>
            </div>
            <p className={mutedClass}>Premium hotel booking platform for modern travelers.</p>
          </div>

          {[
            { title: "Product", links: ["Features", "Hotels", "Pricing", "API"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] }
          ].map((col, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className={`${mutedClass} hover:${textClass} transition-colors`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t ${borderClass} pt-4 pb-5 flex flex-col md:flex-row justify-between items-center`}>
          <p className={mutedClass}>© 2025 Kerago. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
              <a key={i} href="#" className={`${mutedClass} hover:${textClass} transition-colors`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
