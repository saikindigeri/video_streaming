'use client'

import React, { useContext } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ThemeAndVideoContext from '../context/ThemeAndVideoContext'
import Link from 'next/link'

import { CgPlayListAdd } from 'react-icons/cg'

const Saved = () => {

 const {savedVideos}= useContext(ThemeAndVideoContext)
 const {isDarkTheme}=useContext(ThemeAndVideoContext);
 console.log(savedVideos)
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Layout */}
      <div>
        {/* Sidebar (Ensure it has a fixed width) */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-50 ml-24   md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen ">
            <div className={`flex p-6 items-center justify-start   ${isDarkTheme?'bg-stone-800':
                'bg-gray-200'}`}>
                                    <div className='flex m-1 mr-2 text-red-700 bg-gray-700 rounded-full justify-center text-center items-center  ml-2 h-[45px] w-[45px]'><CgPlayListAdd size={22}/></div>
                                    <h1 className='font-semibold'>Saved Videos</h1>
                                   </div>
        {savedVideos.map((eachVideo) => (
              <Link href={`videos/${eachVideo.id}`}
                key={eachVideo.id}
                className="p-1 w-70 m-2 list-none flex flex-col"
              >
                <div>
                  <img alt="thumnail" src={eachVideo.thumbnailUrl} />

                  <div className="flex">
                    <img
                      alt="image"
                      className="h-[30px] m-5 "
                      src={eachVideo.profileImage}
                    />

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
            ))}
        </div>
      </div>
    </>
  )
}

export default Saved
