import React, { useState, useEffect } from 'react';

const SystemHealth = () => {
  const [healthData, setHealthData] = useState({
    cpu: 45,
    memory: 60,
    database: 'Connected',
    networkLatency: '24ms',
    activeConnections: 120,
    lastBackup: '2023-11-20 03:00 AM'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(20, psudoRandom(prev.cpu))),
        memory: Math.min(100, Math.max(30, psudoRandom(prev.memory))),
        activeConnections: Math.max(50, psudoRandom(prev.activeConnections, 5)),
        networkLatency: `${Math.max(10, psudoRandom(parseInt(prev.networkLatency), 2))}ms`
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const psudoRandom = (base, variance = 10) => {
    return Math.floor(base + (Math.random() * variance * 2) - variance);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">System Health & Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Server Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Server Status</h2>
          <div className="space-y-4">
            <HealthIndicator label="CPU Usage" value={healthData.cpu} unit="%" color={healthData.cpu > 80 ? 'bg-red-500' : 'bg-green-500'} />
            <HealthIndicator label="Memory Usage" value={healthData.memory} unit="%" color={healthData.memory > 80 ? 'bg-yellow-500' : 'bg-blue-500'} />

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Database Status</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {healthData.database}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Network Latency</span>
              <span className="font-mono text-gray-800">{healthData.networkLatency}</span>
            </div>
          </div>
        </div>

        {/* Operational Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Operational Metrics</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-600 mb-1">Active User Connections</p>
              <p className="text-3xl font-bold text-indigo-900">{healthData.activeConnections}</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
              <p className="text-sm text-teal-600 mb-1">Last System Backup</p>
              <p className="text-lg font-bold text-teal-900">{healthData.lastBackup}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-600 mb-1">Pending Alerts</p>
              <p className="text-3xl font-bold text-orange-900">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthIndicator = ({ label, value, unit, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-800">{value}{unit}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default SystemHealth;
