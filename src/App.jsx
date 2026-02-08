import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { NotificationProvider } from './contexts/NotificationContext';

// Layouts
import CommuterLayout from './components/layout/CommuterLayout';
import AdminLayout from './components/layout/AdminLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import FleetManagement from './pages/admin/FleetManagement';
import SystemHealth from './pages/admin/SystemHealth';
import UserManagement from './pages/admin/UserManagement';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';
import RevenueReports from './pages/admin/RevenueReports';
import TripAnalytics from './pages/admin/TripAnalytics';

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

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/commuter" replace />} />

          {/* Admin Routes (With Layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="health" element={<SystemHealth />} />
            <Route path="revenue" element={<RevenueReports />} />
            <Route path="trips" element={<TripAnalytics />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

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
    </NotificationProvider>
  );
}

export default App;
