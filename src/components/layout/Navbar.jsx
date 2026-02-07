import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAlerts } from '../../utils/mockData';

const Navbar = ({ onMenuClick, sidebarCollapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`
      fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-30
      transition-all duration-300 shadow-sm
      ${sidebarCollapsed ? 'left-20' : 'left-64'}
      left-0 lg:left-64
    `}>
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-100/80 rounded-xl px-3 py-2 w-80 border border-slate-200/50 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition">
            <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search vehicles, routes, users..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs text-slate-400 bg-white rounded-md border border-slate-200">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="hidden xl:flex items-center space-x-4 mr-4 text-sm">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200/50">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-teal-700 font-medium">35 Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <span className="text-slate-600">10 Routes</span>
            </div>
          </div>

          {/* Mobile Search */}
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-xl">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-100 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {mockAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                  {mockAlerts.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/50 py-2 animate-fadeIn">
                <div className="px-4 py-3 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 transition">
                      <div className="flex items-start space-x-3">
                        <span className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'warning' ? 'bg-amber-500' : 'bg-teal-500'
                        }`}></span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{alert.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{alert.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <button className="text-teal-600 text-sm font-medium hover:text-teal-700 w-full text-center transition">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-slate-100 rounded-xl transition">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-1.5 hover:bg-slate-100 rounded-xl transition"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">
                A
              </div>
              <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/50 py-2 animate-fadeIn">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-medium text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500">admin@smtts.lk</p>
                </div>
                <Link to="/admin/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                  Your Profile
                </Link>
                <Link to="/admin/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                  Settings
                </Link>
                <hr className="my-1 border-slate-100" />
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
