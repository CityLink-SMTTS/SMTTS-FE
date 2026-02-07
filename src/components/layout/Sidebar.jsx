import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { 
      section: 'Main',
      items: [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/fleet', label: 'Fleet Management', icon: '🚌' },
        { path: '/admin/users', label: 'User Management', icon: '👥' },
        { path: '/admin/health', label: 'System Health', icon: '💓' },
      ]
    },
    {
      section: 'Analytics',
      items: [
        { path: '/admin/revenue', label: 'Revenue Reports', icon: '💰' },
        { path: '/admin/trips', label: 'Trip Analytics', icon: '📈' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
      ]
    }
  ];

  const handleLogout = () => {
    // Clear auth tokens/session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50
        transition-all duration-300 ease-in-out shadow-2xl
        ${collapsed ? 'w-20' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                <span className="text-xl">🚍</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">SMTTS</span>
            </div>
          )}
          {collapsed && (
            <div className="w-9 h-9 mx-auto rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
              <span className="text-xl">🚍</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-6 h-6 items-center justify-center hover:bg-slate-700 rounded transition text-slate-400 hover:text-white"
          >
            {collapsed ? '»' : '«'}
          </button>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-slate-700 rounded text-slate-400"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6 h-[calc(100%-8rem)] overflow-y-auto">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              {!collapsed && (
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-3">
                  {section.section}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all
                        ${isActive(item.path) 
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20' 
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      title={collapsed ? item.label : ''}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
              A
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@smtts.lk</p>
              </div>
            )}
            {!collapsed && (
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/20 rounded-lg transition text-slate-400 hover:text-red-400"
                title="Logout"
              >
                🚪
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
