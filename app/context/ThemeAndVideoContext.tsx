"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define types for the context
interface Video {
  id: string;
  title: string;
  url: string;
}

interface ThemeAndVideoContextType {
  isDarkTheme: boolean;
  savedVideos: Video[];
  toggleTheme: () => void;
  addVideo: (video: Video) => void;
  activeTab: string;
  changeTab: (tab: string) => void;
}

// Create context with an undefined default value
const ThemeAndVideoContext = createContext<ThemeAndVideoContextType | null>(null);

// Define props for the provider
interface ThemeAndVideoProviderProps {
  children: ReactNode;
}

export const ThemeAndVideoProvider: React.FC<ThemeAndVideoProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [savedVideos, setSavedVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState<string>("home");

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  const addVideo = (video: Video) => {
    setSavedVideos((prevVideos) =>
      prevVideos.some((eachVideo) => eachVideo.id === video.id)
        ? prevVideos.filter((eachVideo) => eachVideo.id !== video.id) // Remove video if already saved
        : [...prevVideos, video] // Add video if not saved
    );
  };

  const changeTab = (tab: string) => setActiveTab(tab);

  return (
    <ThemeAndVideoContext.Provider
      value={{ isDarkTheme, toggleTheme, savedVideos, addVideo, activeTab, changeTab }}
    >
      {children}
    </ThemeAndVideoContext.Provider>
  );
};

export default ThemeAndVideoContext;