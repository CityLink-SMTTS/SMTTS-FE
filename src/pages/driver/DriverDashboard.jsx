import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
  const [isTripActive, setIsTripActive] = useState(false);
  const [tripDuration, setTripDuration] = useState(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    let interval;
    if (isTripActive) {
      interval = setInterval(() => {
        setTripDuration(prev => prev + 1);
        setCurrentDistance(prev => prev + 0.1);
        // Simulate earning increase every 10 seconds
        if (tripDuration % 10 === 0) {
          setEarnings(prev => prev + 50);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTripActive, tripDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Driver Dashboard</h1>

      {/* Trip Status Card */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Current Trip</h2>
        <div className="text-5xl font-mono font-bold text-gray-900 mb-6">
          {formatTime(tripDuration)}
        </div>

        <div className="flex justify-center space-x-12 mb-8">
          <div>
            <p className="text-gray-500">Distance</p>
            <p className="text-xl font-bold">{currentDistance.toFixed(1)} km</p>
          </div>
          <div>
            <p className="text-gray-500">Earnings</p>
            <p className="text-xl font-bold">Rs. {earnings}</p>
          </div>
        </div>

        <button
          onClick={() => setIsTripActive(!isTripActive)}
          className={`px-8 py-4 rounded-full text-xl font-bold text-white transition shadow-lg
            ${isTripActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isTripActive ? 'Stop Trip' : 'Start Trip'}
        </button>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/driver/fare" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-between group">
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">Fare Deduction</h3>
            <p className="text-gray-500">Manual & Automatic Mode</p>
          </div>
          <span className="text-3xl">💳</span>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
            <p className="text-gray-500">No new alerts</p>
          </div>
          <span className="text-3xl">🔔</span>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
