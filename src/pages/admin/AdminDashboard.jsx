import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  mockSystemStats, 
  mockSystemHealth, 
  mockRevenueData, 
  mockRecentActivities,
  mockPerformanceData 
} from '../../utils/mockData';

const AdminDashboard = () => {
  const [stats] = useState(mockSystemStats);
  const [systemHealth] = useState(mockSystemHealth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <p className="text-slate-500">{formatDate(currentTime)} • Smart Multi-Modal Transportation System</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            to="/admin/fleet" 
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition flex items-center space-x-2 shadow-lg shadow-teal-500/20"
          >
            <span>🚌</span>
            <span>Fleet Management</span>
          </Link>
        </div>
      </div>

      {/* Overview Stats - Total Trips, Revenue, Active Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Trips Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-medium">Total Trips</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-1">{stats.totalTrips.toLocaleString()}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Today: <span className="text-slate-600 font-medium">{stats.tripsToday.toLocaleString()}</span></span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">↑ 12%</span>
            </div>
          </div>
        </div>

        {/* Revenue Summary Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-medium">Revenue Summary</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-1">Rs. {(stats.dailyRevenue / 1000).toFixed(0)}K</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Monthly: <span className="text-slate-600 font-medium">Rs. {(stats.monthlyRevenue / 1000000).toFixed(1)}M</span></span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">↑ 8.5%</span>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-teal-400 to-emerald-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-medium">Active Users</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-1">{stats.activeUsers.toLocaleString()}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Total: <span className="text-slate-600 font-medium">{stats.totalUsers.toLocaleString()}</span></span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">+{stats.newUsersToday} today</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Health Monitoring Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">System Health Monitoring</h2>
              <p className="text-sm text-slate-500">Real-time server and service status</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Server Uptime */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">Server Uptime</h3>
            <div className="space-y-4">
              {systemHealth.servers.map((server, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        server.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="font-medium text-slate-700">{server.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      server.status === 'Online' ? 'text-green-600' : 'text-yellow-600'
                    }`}>{server.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Uptime</span>
                      <p className="font-semibold text-slate-700">{server.uptime}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">CPU</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              server.cpu > 70 ? 'bg-red-500' : server.cpu > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${server.cpu}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{server.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Memory</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              server.memory > 70 ? 'bg-red-500' : server.memory > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${server.memory}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{server.memory}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">System Status Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              {systemHealth.services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'Operational' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-slate-700 text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      service.status === 'Operational' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>{service.status}</span>
                    <span className="text-xs text-slate-500">{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg p-4 text-white">
                <p className="text-xs opacity-80">Server Uptime</p>
                <p className="text-2xl font-bold">{stats.serverUptime}%</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-4 text-white">
                <p className="text-xs opacity-80">API Response</p>
                <p className="text-2xl font-bold">{stats.apiResponseTime}ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Weekly Revenue</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg font-medium">Week</button>
              <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">Month</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-3">
            {mockRevenueData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${(data.revenue / 200000) * 100}%`, minHeight: '30px' }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    Rs. {data.revenue.toLocaleString()}
                  </div>
                </div>
                <span className="text-sm text-slate-500 mt-3 font-medium">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Load Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">System Load Today</h3>
            <span className="text-sm text-slate-500">Peak: 90% at 18:00</span>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mockPerformanceData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    data.load > 80 ? 'bg-gradient-to-t from-red-600 to-red-400' : 
                    data.load > 60 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' : 
                    'bg-gradient-to-t from-green-600 to-green-400'
                  }`}
                  style={{ height: `${data.load}%` }}
                ></div>
                <span className="text-xs text-slate-500 mt-2">{data.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-6 text-xs">
            <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded mr-2"></span>Low (&lt;60%)</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded mr-2"></span>Medium</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded mr-2"></span>High (&gt;80%)</div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/fleet" className="w-full p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 text-teal-700 rounded-xl hover:from-teal-100 hover:to-emerald-100 transition flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white">🚌</span>
              </div>
              <div>
                <p className="font-semibold">Fleet Management</p>
                <p className="text-xs text-teal-600">{stats.totalVehicles} vehicles</p>
              </div>
            </Link>
            <Link to="/admin/users" className="w-full p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 text-cyan-700 rounded-xl hover:from-cyan-100 hover:to-blue-100 transition flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white">👥</span>
              </div>
              <div>
                <p className="font-semibold">User Management</p>
                <p className="text-xs text-cyan-600">{stats.totalUsers.toLocaleString()} users</p>
              </div>
            </Link>
            <Link to="/admin/health" className="w-full p-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:from-slate-100 hover:to-slate-200 transition flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                <span className="text-white">📊</span>
              </div>
              <div>
                <p className="font-semibold">System Health</p>
                <p className="text-xs text-slate-500">{stats.systemHealth}% uptime</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
            <button className="text-teal-600 text-sm hover:underline font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-xl transition">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'warning' ? 'bg-amber-500' :
                  activity.severity === 'success' ? 'bg-green-500' : 'bg-cyan-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{activity.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
                <ActivityIcon type={activity.type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ type }) => {
  const icons = {
    vehicle: '🚌',
    user: '👤',
    route: '🛣️',
    alert: '⚠️',
    payment: '💳',
    system: '⚙️'
  };
  return <span className="text-lg">{icons[type] || '📌'}</span>;
};

export default AdminDashboard;
