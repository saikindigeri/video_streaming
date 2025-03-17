'use client'

import React, { useContext } from 'react'

import ThemeAndVideoContext, { ThemeAndVideoContextType, Video } from '../context/ThemeAndVideoContext'
import Link from 'next/link'
import { CgPlayListAdd } from 'react-icons/cg'
import Image from 'next/image'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar/Sidebar'


const Saved = () => {



 

  const { savedVideos, isDarkTheme } = useContext(ThemeAndVideoContext);
  
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Layout */}
      <div>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-50 ml-24 md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen">
          <div className={`flex p-6 items-center justify-start ${isDarkTheme ? 'bg-stone-800' : 'bg-gray-200'}`}>
            <div className='flex m-1 mr-2 text-red-700 bg-gray-700 rounded-full justify-center text-center items-center ml-2 h-[45px] w-[45px]'>
              <CgPlayListAdd size={22} />
            </div>
            <h1 className='font-semibold'>Saved Videos</h1>
          </div>

          {savedVideos.length > 0 ? (
            savedVideos.map((eachVideo) => (
              <Link href={`videos/${eachVideo.id}`} key={eachVideo.id} className="p-1 w-70 m-2 list-none flex flex-col">
                <div>
                  <Image width={500} height={500} alt="thumbnail" src={eachVideo.thumbnailUrl} />
                  <div className="flex">
                    <Image height={100} width={100} alt="image" className="h-[30px] m-5 " src={eachVideo.profileImage} />
                    <div className="flex flex-col justify-start p-2">
                      <h1 className="text-[12px] ">{eachVideo.title}</h1>
                      <h2 className="text-[13px] text-gray-500">{eachVideo.name}</h2>
                      <p className="text-[12px] text-gray-500">
                        {eachVideo.viewCount} &#8226; {eachVideo.publishedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='flex mt-10 flex-col text-center justify-center items-center space-y-2'>
              <Image width={300} height={300} src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no saved videos" />
              <h1 className='font-xs'>No saved videos found</h1>
              <p className='text-gray-400 text-sm'>You can save your videos while watching them</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Saved;
