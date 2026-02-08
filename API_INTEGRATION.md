# API Integration Guide

## Overview
This project uses Axios for all backend API communications. The API layer is organized into services for better maintainability.

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

### API Base Configuration
Located in `src/services/api.js`:
- Base URL: Configured via environment variable
- Timeout: 10 seconds
- Auto-authentication: JWT token from localStorage
- Error handling: Automatic retry and error logging

## Services

### 1. Authentication Service (`authService`)
```javascript
import { authService } from '@/services';

// Login
const response = await authService.login({ email, password });

// Register
const response = await authService.register(userData);

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### 2. Dashboard Service (`dashboardService`)
```javascript
import { dashboardService } from '@/services';

// Get dashboard statistics
const stats = await dashboardService.getStats();

// Get recent activities
const activities = await dashboardService.getRecentActivities();
```

### 3. Fleet Service (`fleetService`)
```javascript
import { fleetService } from '@/services';

// Vehicles
const vehicles = await fleetService.getVehicles();
const vehicle = await fleetService.getVehicle(id);
await fleetService.createVehicle(vehicleData);
await fleetService.updateVehicle(id, vehicleData);
await fleetService.deleteVehicle(id);

// Routes
const routes = await fleetService.getRoutes();
await fleetService.createRoute(routeData);
await fleetService.updateRoute(id, routeData);
await fleetService.deleteRoute(id);

// Schedules
const schedules = await fleetService.getSchedules();
await fleetService.createSchedule(scheduleData);
await fleetService.updateSchedule(id, scheduleData);
await fleetService.deleteSchedule(id);
```

### 4. User Service (`userService`)
```javascript
import { userService } from '@/services';

// Get users with filters
const users = await userService.getUsers({ role: 'commuter', status: 'active' });

// CRUD operations
const user = await userService.getUser(id);
await userService.createUser(userData);
await userService.updateUser(id, userData);
await userService.deleteUser(id);

// Toggle user status
await userService.toggleUserStatus(id);
```

### 5. System Service (`systemService`)
```javascript
import { systemService } from '@/services';

// Get health metrics
const health = await systemService.getHealthMetrics();

// Get system logs
const logs = await systemService.getSystemLogs({ level: 'error', limit: 100 });
```

### 6. Analytics Service (`analyticsService`)
```javascript
import { analyticsService } from '@/services';

// Get revenue reports
const revenue = await analyticsService.getRevenueReports({ 
  startDate: '2024-01-01', 
  endDate: '2024-12-31' 
});

// Get trip analytics
const trips = await analyticsService.getTripAnalytics({ timeRange: 'week' });

// Export report
const blob = await analyticsService.exportReport('revenue', { format: 'csv' });
```

## Usage in Components

### Example: Fetching Data with useEffect

```javascript
import React, { useState, useEffect } from 'react';
import { fleetService } from '@/services';
import { useNotification } from '@/contexts/NotificationContext';

const FleetManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await fleetService.getVehicles();
      setVehicles(data);
    } catch (error) {
      notify.error('Failed to load vehicles', 'Error');
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fleetService.deleteVehicle(id);
      notify.success('Vehicle deleted successfully', 'Success');
      fetchVehicles(); // Refresh list
    } catch (error) {
      notify.error('Failed to delete vehicle', 'Error');
    }
  };

  // ... rest of component
};
```

### Example: Creating/Updating Data

```javascript
const handleSubmit = async (formData) => {
  try {
    if (editMode) {
      await fleetService.updateVehicle(vehicleId, formData);
      notify.success('Vehicle updated successfully', 'Success');
    } else {
      await fleetService.createVehicle(formData);
      notify.success('Vehicle created successfully', 'Success');
    }
    fetchVehicles();
    closeModal();
  } catch (error) {
    notify.error('Operation failed', 'Error');
    console.error('Error:', error);
  }
};
```

## Error Handling

The API automatically handles common errors:
- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **500 Server Error**: Server error

Custom error handling in components:
```javascript
try {
  const data = await service.someMethod();
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Server error:', error.response.data);
    notify.error(error.response.data.message || 'Operation failed');
  } else if (error.request) {
    // No response from server
    notify.error('No response from server', 'Connection Error');
  } else {
    // Request setup error
    notify.error('Request failed', 'Error');
  }
}
```

## Authentication Flow

1. User logs in via `authService.login()`
2. Token is stored in localStorage
3. All subsequent requests include token in Authorization header
4. On 401 error, user is automatically logged out and redirected

## Backend API Endpoints Expected

### Auth
- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/logout`
- GET `/api/auth/me`

### Dashboard
- GET `/api/admin/dashboard/stats`
- GET `/api/admin/dashboard/activities`

### Fleet
- GET/POST `/api/admin/vehicles`
- GET/PUT/DELETE `/api/admin/vehicles/:id`
- GET/POST `/api/admin/routes`
- GET/PUT/DELETE `/api/admin/routes/:id`
- GET/POST `/api/admin/schedules`
- PUT/DELETE `/api/admin/schedules/:id`

### Users
- GET/POST `/api/admin/users`
- GET/PUT/DELETE `/api/admin/users/:id`
- PATCH `/api/admin/users/:id/toggle-status`

### System
- GET `/api/admin/system/health`
- GET `/api/admin/system/logs`

### Analytics
- GET `/api/admin/analytics/revenue`
- GET `/api/admin/analytics/trips`
- GET `/api/admin/analytics/export/:type`

## Next Steps

1. Update your backend to match these endpoints
2. Replace mock data in components with API calls
3. Test each endpoint thoroughly
4. Add loading states and error handling
5. Implement proper authentication flow
