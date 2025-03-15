'use client';

import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';

import Link from 'next/link';
import { HiFire } from 'react-icons/hi';
import ThemeAndVideoContext from '../context/ThemeAndVideoContext';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: number;
  publishedAt: string;
  name: string;
  profileImageUrl: string;
}

const Trending: React.FC = () => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const { isDarkTheme } = useContext(ThemeAndVideoContext);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      const url = 'https://apis.ccbp.in/videos/trending';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      try {
        const response = await fetch(url, options);
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

        setTrendingVideos(updatedData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchTrendingVideos();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div className="flex-1 md:ml-50 ml-24 md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen">
          {/* Banner Section */}
          <div className={`flex p-6 items-center justify-start ${isDarkTheme ? 'bg-stone-800' : 'bg-gray-200'}`}>
            <div className='flex m-1 mr-2 text-red-700 bg-gray-500 dark:bg-gray-950 rounded-full justify-center text-center items-center ml-2 h-[45px] w-[45px]'>
              <HiFire size={22} />
            </div>
            <h2 className='font-semibold'>Trending</h2>
          </div>

          {/* Video List */}
          <div className="flex flex-col justify-start transition-all duration-300">
            {trendingVideos.map((eachVideo) => (
              <Link href={`videos/${eachVideo.id}`} key={eachVideo.id} className="p-1 w-full m-2 list-none flex flex-col">
                <div className='flex'>
                  <Image width={500} height={500} alt="thumbnail" className='w-70' src={eachVideo.thumbnailUrl} />
                  <div className="flex flex-col p-2">
                    <h1 className="text-[12px] ">{eachVideo.title}</h1>
                    <h2 className="text-[13px] text-gray-500">{eachVideo.name}</h2>
                    <p className="text-[12px] text-gray-500">{eachVideo.viewCount} &#8226; {eachVideo.publishedAt}</p>
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

export default Trending;