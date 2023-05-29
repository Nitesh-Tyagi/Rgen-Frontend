import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onLogout, userId }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch('http://localhost:8000/api/user/getUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.username);
        })
        .catch((error) => {
          console.error('Error fetching username:', error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex flex-row justify-between items-center px-24 absolute w-full h-16 left-0 top-0 bg-white shadow-md">
      <div className="flex items-center">
        <p className="text-xl font-bold">rgen ai</p>
        <div className="w-1 h-6 bg-gray-800 mx-4" />
        <p className="text-lg">{username}</p>
      </div>
      <nav className="">
        <ul className="flex space-x-9">
          <li>
            <Link
              to="/dashboard"
              className="text-sky-900 hover:text-lime-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="text-sky-900 hover:text-lime-600"
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="text-sky-900 hover:text-lime-600"
            >
              History
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-sky-900 hover:text-lime-600"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="text-sky-900 hover:text-lime-600"
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-sky-900 hover:text-lime-600 cursor-pointer"
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
