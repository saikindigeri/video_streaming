'use client'

import React, { useContext } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ThemeAndVideoContext from '../context/ThemeAndVideoContext'

const Saved = () => {

 const {savedVideos}= useContext(ThemeAndVideoContext)
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
    Saved videos
        </div>
      </div>
    </>
  )
}

export default Saved
