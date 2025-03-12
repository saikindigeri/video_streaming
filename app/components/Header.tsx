"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiUser, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import ThemeAndVideoContext from "../context/ThemeAndVideoContext";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkTheme, toggleTheme } = useContext(ThemeAndVideoContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('s');
    alert("Logged out successfully!");
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className={`fixed h-15 top-0 left-0 w-full z-50 shadow-md transition ${
      isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <div className="container mx-auto flex  justify-between items-center p-4">
        
     
     
       <Link href="/">
            <span className="text-2xl font-bold text-black cursor-pointer">
              MyLogo
            </span>
          </Link>

      
        
        
      

      
        <div className="flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full    transition"
          >
            {isDarkTheme ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Profile Icon */}
          <Link href="/profile">
            <FiUser size={24} className="  cursor-pointer" />
          </Link>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 pb-2  px-4 py-2 rounded transition"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

    
     
    </header>
  );
}
