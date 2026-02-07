import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import SystemHealth from '../pages/admin/SystemHealth';
import FleetManagement from '../pages/admin/FleetManagement';
import UserManagement from '../pages/admin/UserManagement';
import DriverDashboard from '../pages/driver/DriverDashboard';
import FareDeduction from '../pages/driver/FareDeduction';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/health" element={<SystemHealth />} />
      <Route path="/admin/fleet" element={<FleetManagement />} />
      <Route path="/admin/users" element={<UserManagement />} />

      {/* Driver Routes */}
      <Route path="/driver" element={<DriverDashboard />} />
      <Route path="/driver/fare" element={<FareDeduction />} />
    </Routes>
  );
};

export default AppRoutes;
