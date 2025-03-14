"use client";
import { useContext } from "react";
import Link from "next/link";

import ThemeAndVideoContext from "../context/ThemeAndVideoContext";

import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";

export default function Sidebar() {


 const {isDarkTheme}=useContext(ThemeAndVideoContext);
  const { activeTab, changeTab } = useContext(ThemeAndVideoContext);



 console.log(isDarkTheme);
  const menuItems = [
    { name: "Home", href: "/", icon: <AiFillHome size={24} /> },
    { name: "Trending", href: "/trending", icon: <HiFire size={24} /> },
    { name: "Gaming", href: "/gaming", icon: <SiYoutubegaming size={24} /> },
    { name: "Saved Videos", href: "/saved", icon: <CgPlayListAdd size={24} /> },
  ];



  return (
    <nav className={`fixed top-[60px]  flex flex-col justify-between left-0  min-h-screen transition-all duration-300 w-24 md:w-50  ${isDarkTheme? "bg-neutral-700 ":"bg-white"} `}>
      
      {/* Toggle Button (For Mobile & Desktop) */}
   
      {/* Menu List */}
      <div className="flex flex-col justify-center items-center md:justify-items-start  py-6 space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} onClick={() => changeTab(item.name)} className={`flex flex-col items-center md:flex-row md:space-x-4 p-3 rounded-lg w-full justify-center md:justify-start ${activeTab===item.name?'text-red-500':"bg-white-50"}`}>
            {item.icon}
         <span className="text-sm hidden md:inline">{item.name}</span>
          </Link>
        ))}
       
      </div>

      <div>
         <h2>donw</h2>
        </div>
    </nav>
  );
}
