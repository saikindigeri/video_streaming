'use client';

import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { SiYoutubegaming } from 'react-icons/si';
import ThemeAndVideoContext from '../context/ThemeAndVideoContext';
import Sidebar from '../components/Sidebar';

const Gaming = () => {
  const [gamingVideos, setGamingVideos] = useState([]);
  const { isDarkTheme } = useContext(ThemeAndVideoContext);

  useEffect(() => {
    const fetchGamingVideos = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      const url = 'https://apis.ccbp.in/videos/gaming';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const updatedData = data.videos.map((eachVideo) => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
        }));

        setGamingVideos(updatedData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchGamingVideos();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div className="flex-1 md:ml-50 ml-24 md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen">
          {/* Banner Section */}
          <div className={`flex p-6 items-center justify-start ${isDarkTheme ? 'bg-stone-800' : 'bg-gray-200'}`}>
            <div className='flex m-1 mr-2 text-red-700 bg-gray-700 rounded-full justify-center text-center items-center ml-2 h-[45px] w-[45px]'>
              <SiYoutubegaming size={22} />
            </div>
            <h1 className='font-semibold'>Gaming</h1>
          </div>
          
          {/* Video List */}
          <div className="flex flex-wrap transition-all duration-300">
            {gamingVideos.map((eachVideo) => (
              <Link href={`videos/${eachVideo.id}`} key={eachVideo.id} className="p-1 m-2 list-none flex flex-col">
                <div className='flex flex-col'>
                  <Image width={160} height={90} alt="thumbnail" className='w-40' src={eachVideo.thumbnailUrl} />
                  <div className="flex flex-col p-2">
                    <h1 className="text-[12px]">{eachVideo.title}</h1>
                    <p className="text-[12px] text-gray-500">{eachVideo.viewCount} Watching worldwide</p>
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

export default Gaming;
