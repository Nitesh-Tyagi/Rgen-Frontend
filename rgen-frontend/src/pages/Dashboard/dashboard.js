// Dashboard.js
import React, { useEffect, useState } from 'react';

function Dashboard({ userId, vidId }) {
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    if (userId && vidId) {
      fetch('http://localhost:8000/api/video/getVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, id: vidId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setVideoDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching video details:', error);
        });
    }
  }, [userId, vidId]);

  const handleDownload = () => {
    if (userId && vidId) {
      fetch('http://localhost:8000/api/video/downloadVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, id: vidId }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { link } = data;
          if (link) {
            window.open(link, '_blank');
          }
        })
        .catch((error) => {
          console.error('Error downloading video:', error);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {videoDetails ? (
        <div>
          <p className="mb-2">
            <span className="font-bold">ID:</span> {videoDetails.id}
          </p>
          <p className="mb-2">
            <span className="font-bold">Video Name:</span> {videoDetails.videoname}
          </p>
          <p className="mb-2">
            <span className="font-bold">Length:</span> {videoDetails.length}
          </p>
          {/* <p className="mb-2">
            <span className="font-bold">User ID:</span> {videoDetails.userid}
          </p> */}
          <p className="mb-2">
            <span className="font-bold">Input:</span> {videoDetails.input}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
