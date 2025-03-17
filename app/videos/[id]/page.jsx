"use client"; // Ensures compatibility with Next.js App Router

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For dynamic route params
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiListPlus } from "react-icons/bi";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

import ThemeAndVideoContext from "../../context/ThemeAndVideoContext";


const VideoDetailPage = () => {
  const { id } = useParams(); // Get video ID dynamically
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(null); // "like", "dislike", or null
  
  const { addVideo,savedVideos } = useContext(ThemeAndVideoContext);


  const saveVideo = (video) => {
    addVideo(video);
  };

  useEffect(() => {
    if (!id) return;

    const fetchVideoDetails = async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };
      try {
        const response = await fetch(
          `https://apis.ccbp.in/videos/${id}`,
          options
        );

        if (!response.ok) throw new Error("Failed to fetch video");

        const data = await response.json();

        console.log(data);

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

  const toggleLike = () => {
    setLikeStatus(likeStatus === "like" ? null : "like");
  };

  const toggleDislike = () => {
    setLikeStatus(likeStatus === "dislike" ? null : "dislike");
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div className=" flex-1 py-6 md:ml-50 ml-25 mt-20 min-h-screen">
          <div className="w-100% ml-3 mr-3 h-[400px]">
            <ReactPlayer
              url={video.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <div className="ml-3 mb-1 mr-3">
            <h1 className="text-[14px] mb-4">{video.title}</h1>
            <div className="mt-3 flex items-center justify-between text-gray-700 dark:text-gray-300">
              <p className="text-xs text-gray-500">
                {video.viewCount} views • {video.publishedAt}
              </p>
              <div className="flex gap-4 items-center">
              <button
                  className={`flex items-center gap-1 text-xs ${
                    likeStatus === "like" ? "text-blue-500" : "text-gray-600"
                  } hover:text-blue-700`}
                  onClick={toggleLike}
                >
                  <AiOutlineLike size={20} />
                  <span>{likeStatus === "like" ? "Liked" : "Like"}</span>
                </button>

                {/* Dislike Button */}
                <button
                  className={`flex items-center gap-1 text-xs  ${
                    likeStatus === "dislike" ? "text-red-500" : "text-gray-600"
                  } hover:text-red-700`}
                  onClick={toggleDislike}
                >
                  <AiOutlineDislike size={20} />
                  <span>{likeStatus === "dislike" ? "Disliked" : "Dislike"}</span>
                </button>
                <button  onClick={() => saveVideo(video)} className="flex items-center gap-1 text-xs  text-gray-600 dark:text-gray-400 hover:text-gray-800">
                  <BiListPlus size={20} />
                  {savedVideos.some((eachVideo) => eachVideo.id === video.id) ? "Unsave" : "Save"}
                </button>
              </div>
            </div>
            <hr className="my-4" />

            <div className="flex   gap-3">
              <img
                src={video.profileImage}
                alt="Channel"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <p className="">{video.name}</p>
                <p className=" text-xs">{video.subscriberCount} Subscribers </p>
                <p className="text-gray-400 text-xs">{video.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailPage;
