// settings.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings({ userId }) {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    userId: userId,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching user settings for userId:', userId);

    fetch('http://localhost:8000/api/user/getSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched user data:', data);
        setUserData(data || {}); // Initialize with empty object if data is null
        setFormData(data || {});
      })
      .catch((error) => {
        console.error('Error fetching user settings:', error);
      });
  }, [userId]);

  useEffect(() => {
    console.log('User data:', userData);
    console.log('Form data:', formData);
  }, [userData, formData]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSettings = () => {
    console.log('Updating user settings:', formData);

    fetch('http://localhost:8000/api/user/putSettings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update response:', data);
        if (data.userId === formData.userId) {
          setMessage('Successfully updated!');
        }
      })
      .catch((error) => {
        console.error('Error updating user settings:', error);
      });
  };

  const handleRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <form className="w-1/2 mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleRedirect}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleUpdateSettings}
          >
            Save
          </button>
        </div>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
}

export default Settings;
