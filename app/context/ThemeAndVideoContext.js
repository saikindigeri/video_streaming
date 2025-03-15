"use client";
import { createContext, useState, useEffect } from "react";

const ThemeAndVideoContext = createContext({
  isDarkTheme: false,
  savedVideos: [],
  toggleTheme: () => {},
  addVideo: () => {},
  activeTab: "Home",
  changeTab: () => {},
  
});

export const ThemeAndVideoProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("Home");

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



  const addVideo = (video) => {
    setSavedVideos((prevVideos) => {
      const isAlreadySaved = prevVideos.some((eachVideo) => eachVideo.id === video.id);
  
      if (isAlreadySaved) {
        console.log("Removing video:", video.id);
        return prevVideos.filter((eachVideo) => eachVideo.id !== video.id); // Remove video
      } else {
        console.log("Adding video:", video.id);
        return [...prevVideos, video]; // Add video
      }
    });
  };
  
  

  
  const changeTab = (tab) => {
    console.log("Changing tab to:", tab);
    setActiveTab(tab);
  };

  return (
    <ThemeAndVideoContext.Provider
      value={{ isDarkTheme, toggleTheme, savedVideos, addVideo,activeTab,setActiveTab ,changeTab}}
    >
      {children}
    </ThemeAndVideoContext.Provider>
  );
};

export default ThemeAndVideoContext;
