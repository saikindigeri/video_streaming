"use client";


import { createContext, useState, useEffect } from "react";

const ThemeAndVideoContext = createContext({
  isDarkTheme: false,
  savedVideos: [],
  toggleTheme: () => {},
  addVideo: () => {},
});

export const ThemeAndVideoProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);

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
        if (!prevVideos.some((v) => v.id === video.id)) {
            return [...prevVideos, video];
        }
        return prevVideos;
    });
};


  return (
    <ThemeAndVideoContext.Provider
      value={{ isDarkTheme, toggleTheme, savedVideos, addVideo }}
    >
      {children}
    </ThemeAndVideoContext.Provider>
  );
};

export default ThemeAndVideoContext;
