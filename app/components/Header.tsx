"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HiMoon } from "react-icons/hi";
import { IoPersonCircle, IoSunny } from "react-icons/io5";
import toast from "react-hot-toast";
import ThemeAndVideoContext from "../context/ThemeAndVideoContext";

const Header: React.FC = () => {
  const { isDarkTheme, toggleTheme, changeTab } = useContext(ThemeAndVideoContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    toast.success("Logged out!");
    router.push("/login"); // Redirect to login page
  };

  return (
    <header
      className={`fixed h-15 top-0 left-0 w-full z-50 transition ${isDarkTheme ? "bg-neutral-700" : "bg-white"}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Image
            width={80}
            height={80}
            src={
              isDarkTheme
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            }
            alt="website logo"
            onClick={() => changeTab()}
          />
        </Link>

        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-full transition">
            {isDarkTheme ? <IoSunny size={20} /> : <HiMoon size={20} />}
          </button>

          {/* Profile Icon */}
          <Link href={"#"}>
            <IoPersonCircle size={24} className="cursor-pointer" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center border-outline space-x-2 pb-2 px-4 py-2 rounded transition"
          >
            <span className="font-roboto text-[14px]">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
