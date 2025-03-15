"use client";
import { useContext } from "react";
import Link from "next/link";

import ThemeAndVideoContext from "../context/ThemeAndVideoContext";

import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Sidebar() {
  const { isDarkTheme, activeTab, changeTab } = useContext(ThemeAndVideoContext);

  const menuItems = [
    { name: "Home", href: "/", icon: <AiFillHome size={24} /> },
    { name: "Trending", href: "/trending", icon: <HiFire size={24} /> },
    { name: "Gaming", href: "/gaming", icon: <SiYoutubegaming size={24} /> },
    { name: "Saved Videos", href: "/saved", icon: <CgPlayListAdd size={24} /> },
  ];

  return (
    <nav className={`fixed top-[60px] flex flex-col h-[calc(100vh-60px)] justify-between left-0 transition-all duration-300 w-24 md:w-50 ${isDarkTheme ? "bg-neutral-700 text-white" : "bg-white text-black"} `}>
      {/* Menu List with flex-grow */}
      <div className="flex flex-col flex-grow justify-start items-center md:justify-start py-6 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => changeTab(item.name)}
            className={`flex flex-col items-center md:flex-row md:space-x-4 p-3 rounded-lg w-full justify-center md:justify-start ${
              activeTab === item.name ? "text-red-500" : "hover:bg-gray-200"
            }`}
          >
            {item.icon}
            <span className="text-sm hidden md:inline">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Connect With Us Section at the bottom */}
      <div className="flex flex-col items-center p-4 border-gray-300">
        <h2 className="text-sm font-semibold mb-2">Contact us</h2>
        <div className="flex space-x-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebookF size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaLinkedinIn size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
