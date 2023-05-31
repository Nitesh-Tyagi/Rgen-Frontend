// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ userId, setVidId }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch('http://localhost:8000/api/video/getVideos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setVideos(data);
        })
        .catch((error) => {
          console.error('Error fetching videos:', error);
        });
    }
  }, [userId]);

  const handleClick = (videoId) => {
    setVidId(videoId);
    navigate('/dashboard');
  };

  return (
    <div
      className="flex flex-col justify-center items-center px-24 absolute w-1/4 left-0 top-16 bottom-0 bg-stone-300 shadow-md"
      style={{ overflowX: 'hidden' }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className="mb-1 w-60 bg-white max-h-28 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'red yellow',
            overflowX: 'hidden',
          }}
        >
          {video.id === video.input && (
            <p className="font-bold w-60 bg-zinc-900 text-zinc-100">
              <Link
                to="/dashboard"
                className="block"
                onClick={() => handleClick(video.id)}
              >
                {video.videoname}
              </Link>
            </p>
          )}
          {videos
            .filter((v) => v.input === video.id)
            .map((subVideo) => (
              <Link
                key={subVideo.id}
                to="/dashboard"
                className="ml-4 block text-sm text-gray-700 hover:text-gray-900 w-full"
                onClick={() => handleClick(subVideo.id)}
              >
                {subVideo.videoname}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
