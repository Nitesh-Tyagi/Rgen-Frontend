import React, { useState } from 'react';

function Pricing() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [z, setZ] = useState('');
  const [price, setPrice] = useState('');

  const handleCalculate = () => {
    const requestBody = {
      x: parseFloat(x),
      y: parseFloat(y),
      z: parseFloat(z),
    };

    fetch('http://localhost:8000/api/video/priceCalculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrice(data.price);
      })
      .catch((error) => {
        console.error('Error calculating price:', error);
      });
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="xInput">
          X:
        </label>
        <input
          id="xInput"
          type="text"
          className="border border-gray-400 p-2"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="yInput">
          Y:
        </label>
        <input
          id="yInput"
          type="text"
          className="border border-gray-400 p-2"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="zInput">
          Z:
        </label>
        <input
          id="zInput"
          type="text"
          className="border border-gray-400 p-2"
          value={z}
          onChange={(e) => setZ(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {price && (
        <div className="mt-4">
          <p className="font-bold">Price:</p>
          <p>{price}</p>
        </div>
      )}
    </div>
  );
}

export default Pricing;
