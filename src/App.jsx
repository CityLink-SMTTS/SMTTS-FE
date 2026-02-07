import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CommuterLayout from './components/layout/CommuterLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Commuter Pages
import CommuterDashboard from './pages/commuter/Dashboard';
import RouteChecker from './pages/commuter/RouteChecker';
import SmartCard from './pages/commuter/SmartCard';
import GreenScore from './pages/commuter/GreenScore';
import TripHistory from './pages/commuter/TripHistory';
import Settings from './pages/commuter/Settings';

import ProfileSettings from './pages/commuter/ProfileSettings';
import Booking from './pages/commuter/Booking';

// Driver Pages
import DriverDashboard from './pages/driver/DriverDashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content */}
        <main className="lg:ml-64 pt-16 min-h-screen">
          <AppRoutes />
        </main>
      </div>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/commuter" replace />} />

        {/* Admin Routes (Placeholder Layout) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Commuter Routes (With Layout) */}
        <Route path="/commuter" element={<CommuterLayout />}>
          <Route index element={<CommuterDashboard />} />
          <Route path="booking" element={<Booking />} />
          <Route path="routes" element={<RouteChecker />} />
          <Route path="wallet" element={<SmartCard />} />
          <Route path="green-score" element={<GreenScore />} />
          <Route path="history" element={<TripHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<ProfileSettings />} />
        </Route>

        {/* Driver Routes */}
        <Route path="/driver" element={<DriverDashboard />} />

        {/* 404 Route */}
        <Route path="*" element={<div className="flex items-center justify-center h-screen text-slate-500">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
