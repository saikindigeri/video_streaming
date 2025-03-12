"use client"; // Ensures compatibility with Next.js App Router

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For dynamic route params
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiListPlus } from "react-icons/bi";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

const VideoDetailPage = () => {
    const { id } = useParams(); // Get video ID dynamically
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchVideoDetails = async () => {

            const jwtToken=localStorage.getItem('jwtToken')

            const options = {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
              }
            try {
                const response = await fetch(`https://apis.ccbp.in/videos/${id}`,options);
               
                if (!response.ok) throw new Error("Failed to fetch video");
                
                const data = await response.json();

                console.log(data)

                setVideo({
                    id: data.video_details.id,
                    title: data.video_details.title,
                    videoUrl: data.video_details.video_url,
                    thumbnailUrl: data.video_details.thumbnail_url,
                    viewCount: data.video_details.view_count,
                    publishedAt: data.video_details.published_at,
                    description: data.video_details.description,
                    name: data.video_details.channel.name,
                    profileImage: data.video_details.channel.profile_image_url,
                    subscriberCount: data.video_details.channel.subscriber_count,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoDetails();
    }, [id]);

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
        <Header/>
        <div>
            <Sidebar/>
              <div className="p-5 max-w-4xl mx-auto">
           
            <div className="w-full aspect-video">
                <ReactPlayer url={video.videoUrl} controls width="100%" height="100%" />
            </div>
            <h1 className="text-xl mb-4">{video.title}</h1>
            <div className="mt-3 flex items-center justify-between text-gray-700 dark:text-gray-300">
                <p>{video.viewCount} views • {video.publishedAt}</p>
                <div className="flex gap-4 items-center">
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                        <AiOutlineLike size={20} />
                        <span>{video.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-red-500 hover:text-red-700">
                        <AiOutlineDislike size={20} />
                        <span>{video.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800">
                        <BiListPlus size={20} />
                        <span>Save</span>
                    </button>
                </div>
            </div>
            <hr className="my-4" />
           
            <div className="flex   gap-3">
                <img src={video.profileImage} alt="Channel" className="w-12 h-12 rounded-full" />
               <div className="flex flex-col">
               <p className="font-semibold">{video.name}</p>
               <p className="w-12 h-12">{video.subscriberCount}</p>
               <p className="text-gray-400">{video.description}</p>
               </div>
             
            </div>
           
           
        </div>
        </div>
        </>
      
    );
};

export default VideoDetailPage;
