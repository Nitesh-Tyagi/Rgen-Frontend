import React, { useEffect, useState } from 'react';

function Dashboard({ userId, id }) {
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/video/getVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideoDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching video details:', error);
      });
  }, [userId, id]);

  return (
    <div>
      <h1>Dashboard</h1>
      {videoDetails && (
        <div>
          <p>ID: {videoDetails.id}</p>
          <p>Video Name: {videoDetails.videoname}</p>
          <p>Length: {videoDetails.length}</p>
          <p>User ID: {userId}</p>
          <p>Input: {videoDetails.input}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;