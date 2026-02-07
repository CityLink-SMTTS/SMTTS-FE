import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBus, FaLeaf, FaWallet, FaMapMarkedAlt } from 'react-icons/fa';
import { LogOut, Settings, Menu, X, Ticket } from 'lucide-react';
import Logo from '../common/Logo';

const CommuterLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/commuter', icon: <FaBus /> },
        { name: 'Routes', path: '/commuter/routes', icon: <FaMapMarkedAlt /> },
        { name: 'Wallet', path: '/commuter/wallet', icon: <FaWallet /> },
        { name: 'Green Score', path: '/commuter/green-score', icon: <FaLeaf /> },
    ];

    return (
        <div className="min-h-screen font-sans text-slate-800">
            {/* Background provided by body styles in index.css / tailwind.css */}

            {/* Navigation Bar - Glassmorphism */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm">
                    <div className="w-full px-6 sm:px-8 lg:px-12">
                        <div className="flex items-center justify-between h-20">

                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <Logo className="h-20 w-auto" />
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-2">
                                    {navItems.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.path}
                                            end={item.path === '/commuter'}
                                            className={({ isActive }) =>
                                                `px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 group
                        ${isActive
                                                    ? 'bg-gradient-to-r from-[#0F2027] to-[#203A43] text-white shadow-lg shadow-slate-900/20 transform scale-105'
                                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                                }`
                                            }
                                        >
                                            <span className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}>
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            {/* User Profile / Settings / Logout */}
                            <div className="hidden md:flex items-center gap-3">
                                <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200">
                                    <div className="text-right">
                                        <div className="text-sm font-black text-slate-800 leading-tight">Alex Doe</div>
                                        <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 inline-block border border-emerald-100">
                                            SDG 11 Hero
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F2027] to-[#2C5364] flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
                                        AD
                                    </div>
                                </div>

                                {/* Settings Button */}
                                <button
                                    onClick={() => navigate('/commuter/settings')}
                                    className="bg-slate-100 p-2.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
                                    title="Settings"
                                >
                                    <Settings size={20} />
                                </button>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 p-2.5 rounded-full text-red-400 hover:bg-red-100 hover:text-red-600 transition-all shadow-sm"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="bg-white/50 p-2 rounded-lg text-slate-600 hover:bg-white transition-colors"
                                >
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl absolute w-full">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-base font-bold flex items-center gap-3
                    ${isActive
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    {item.name}
                                </NavLink>
                            ))}
                            <div className="border-t border-slate-100 my-2 pt-2 space-y-2">
                                <button
                                    onClick={() => {
                                        navigate('/commuter/settings');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                >
                                    <Settings size={20} />
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-red-500 hover:bg-red-50 flex items-center gap-3"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-24">
                <Outlet />
            </main>
        </div>
    );
};

export default CommuterLayout;
