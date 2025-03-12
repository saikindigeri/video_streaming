'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Trending = () => {

const [trendingVideos, setTrendingVideos] = useState([]);

useEffect(()=>{

    const fetchTrendingVideos = async () => {
        const jwtToken = localStorage.getItem("jwtToken");
  
        const url = `https://apis.ccbp.in/videos/trending`;
  
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: "GET",
        };
        try {
          const response = await fetch(url, options);
          const data = await response.json();
  
          const updatedData = data.videos.map((eachVideo) => ({
            id: eachVideo.id,
            title: eachVideo.title,
            thumbnailUrl: eachVideo.thumbnail_url,
            viewCount: eachVideo.view_count,
            publishedAt: eachVideo.published_at,
            name: eachVideo.channel.name,
            profileImageUrl: eachVideo.channel.profile_image_url,
          }));
          setTrendingVideos(updatedData);
          console.log(updatedData);
          // Assuming API returns { videos: [] }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
  

    fetchTrendingVideos();
}

,[])

  return (
    <>
    <Header/>
    <div>
        <Sidebar/>
            <div className="flex-1 md:ml-50 ml-24   md:mb-0 mb-15 mt-15 overflow-y-auto min-h-screen">
                 {/* Banner Section */}
       
            
       
                 {/* Video List (Moves Up When Banner is Closed) */}
              
                 <div
                   className={`flex flex-col justify-start  transition-all duration-300 `}
                 >
                   {trendingVideos.map((eachVideo) => (
                     <li
                       key={eachVideo.id}
                       className="p-1 w-full m-2 list-none flex flex-col"
                     >
                       <div className='flex '>
                         <img alt="thumnail" className='w-70' src={eachVideo.thumbnailUrl} />
       
                      
                       
                           <div className="flex flex-col  p-2">
                             <h1 className="text-[12px] ">{eachVideo.title}</h1>
                             <h2 className="text-[13px] text-gray-500">{eachVideo.name}</h2>
       
                             <p className="text-[12px] text-gray-500">
                               {eachVideo.viewCount} &#8226; {eachVideo.publishedAt}
                             </p>
                           </div>
                        
                       </div>
                     </li>
                   ))}
                 </div>
               </div> 
    </div>
    </>
  )
}

export default Trending