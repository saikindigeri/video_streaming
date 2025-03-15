"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import Image from "next/image";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import Sidebar from "./components/Sidebar";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: string;
  publishedAt: string;
  name: string;
  profileImageUrl: string;
}

const Home: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchVideos = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        console.error("JWT Token not found");
        return;
      }

      const url = `https://apis.ccbp.in/videos/all?search=${encodeURIComponent(searchInput)}`;

      const options: RequestInit = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData: Video[] = data.videos.map((eachVideo: any) => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        }));

        setVideos(updatedData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [searchInput]);

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 md:ml-50 ml-24 md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen">
          {/* Banner Section */}
          {showBanner && (
            <div
              className="w-full bg-cover flex justify-between p-6"
              style={{
                backgroundImage:
                  "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')",
                backgroundSize: "stretch",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "200px",
              }}
            >
              <div className="w-1/2 py-4">
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="Nxt Watch Logo"
                  width={80}
                  height={30}
                />
                <p className="mt-2 text-black">
                  Buy Nxt Watch Premium prepaid plans with <br />
                  UPI
                </p>
                <button className="border mt-2 p-1 text-xs text-black">
                  GET IT NOW
                </button>
              </div>
              <button onClick={() => setShowBanner(false)} className="px-4 text-black">
                <AiOutlineClose size={25} />
              </button>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-1/3 m-2 border p-1 outline-neutral-200"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <AiOutlineSearch size={20} />
          </div>

          {/* Video List */}
          <div className={`flex flex-wrap justify-start transition-all duration-300 ${showBanner ? "mt-4" : "mt-0"}`}>
            {videos.map((eachVideo) => (
              <Link
                href={`/videos/${eachVideo.id}`}
                key={eachVideo.id}
                className="p-1 w-70 m-2 list-none flex flex-col"
              >
                <div>
                  <Image width={500} height={500} alt="thumbnail" src={eachVideo.thumbnailUrl} />
                  <div className="flex">
                    <Image width={30} height={30} alt="channel" className="h-[30px] m-5" src={eachVideo.profileImageUrl} />
                    <div className="flex flex-col justify-start p-2">
                      <h1 className="text-[12px]">{eachVideo.title}</h1>
                      <h2 className="text-[13px] text-gray-500">{eachVideo.name}</h2>
                      <p className="text-[12px] text-gray-500">
                        {eachVideo.viewCount} &#8226; {eachVideo.publishedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
