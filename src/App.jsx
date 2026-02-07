import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Commuter Pages
import CommuterDashboard from './pages/commuter/Dashboard';

// Driver Pages
import DriverDashboard from './pages/driver/DriverDashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Commuter Routes */}
        <Route path="/commuter" element={<CommuterDashboard />} />

        {/* Driver Routes */}
        <Route path="/driver" element={<DriverDashboard />} />

        {/* 404 Route */}
        <Route path="*" element={<div className="flex items-center justify-center h-screen">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
