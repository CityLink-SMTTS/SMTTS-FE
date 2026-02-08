import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f1f5f9] bg-glass-pattern">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Navbar */}
            <Navbar onMenuClick={() => setSidebarOpen(true)} sidebarCollapsed={false} />

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 min-h-screen transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
