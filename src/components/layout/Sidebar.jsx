import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/SMTTS_Logo_High_Resolution.png';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            section: 'Main',
            items: [
                { path: '/admin', label: 'Dashboard' },
                { path: '/admin/fleet', label: 'Fleet Management' },
                { path: '/admin/users', label: 'User Management' },
                { path: '/admin/health', label: 'System Health' },
            ]
        },
        {
            section: 'Analytics',
            items: [
                { path: '/admin/revenue', label: 'Revenue Reports' },
                { path: '/admin/trips', label: 'Trip Analytics' },
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
        fixed top-0 left-0 h-full bg-grad-eco text-white z-50
        transition-all duration-300 ease-in-out shadow-2xl shadow-teal-500/20
        ${collapsed ? 'w-20' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                    {!collapsed && (
                        <div className="flex items-center space-x-3">
                            <img
                                src={logo}
                                alt="SMTTS Logo"
                                className="w-10 h-10 rounded-lg shadow-lg object-cover border-2 border-white/10"
                            />
                            <span className="font-bold text-lg bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                SMTTS
                            </span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="flex justify-center w-full">
                            <img
                                src={logo}
                                alt="SMTTS Logo"
                                className="w-10 h-10 rounded-lg shadow-lg object-cover border-2 border-white/10"
                            />
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex w-6 h-6 items-center justify-center hover:bg-white/10 rounded transition text-white/70 hover:text-white"
                    >
                        {collapsed ? '»' : '«'}
                    </button>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 hover:bg-white/10 rounded text-white/70 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-6 h-[calc(100%-8rem)] overflow-y-auto">
                    {menuItems.map((section, idx) => (
                        <div key={idx}>
                            {!collapsed && (
                                <p className="text-xs text-white/60 uppercase tracking-wider mb-2 px-3 font-semibold">
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
                        flex items-center px-4 py-2.5 rounded-xl transition-all
                        ${isActive(item.path)
                                                    ? 'bg-white/20 backdrop-blur-glass text-white shadow-lg border border-white/30'
                                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                                }
                      `}
                                            title={item.label}
                                        >
                                            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                            {collapsed && <span className="text-sm font-medium">{item.label.charAt(0)}</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
