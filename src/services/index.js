import api from './api';

// Auth Services
export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// Dashboard Services
export const dashboardService = {
    getStats: async () => {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    },

    getRecentActivities: async () => {
        const response = await api.get('/admin/dashboard/activities');
        return response.data;
    },
};

// Fleet Management Services
export const fleetService = {
    // Vehicles
    getVehicles: async () => {
        const response = await api.get('/admin/vehicles');
        return response.data;
    },

    getVehicle: async (id) => {
        const response = await api.get(`/admin/vehicles/${id}`);
        return response.data;
    },

    createVehicle: async (vehicleData) => {
        const response = await api.post('/admin/vehicles', vehicleData);
        return response.data;
    },

    updateVehicle: async (id, vehicleData) => {
        const response = await api.put(`/admin/vehicles/${id}`, vehicleData);
        return response.data;
    },

    deleteVehicle: async (id) => {
        const response = await api.delete(`/admin/vehicles/${id}`);
        return response.data;
    },

    // Routes
    getRoutes: async () => {
        const response = await api.get('/admin/routes');
        return response.data;
    },

    getRoute: async (id) => {
        const response = await api.get(`/admin/routes/${id}`);
        return response.data;
    },

    createRoute: async (routeData) => {
        const response = await api.post('/admin/routes', routeData);
        return response.data;
    },

    updateRoute: async (id, routeData) => {
        const response = await api.put(`/admin/routes/${id}`, routeData);
        return response.data;
    },

    deleteRoute: async (id) => {
        const response = await api.delete(`/admin/routes/${id}`);
        return response.data;
    },

    // Schedules
    getSchedules: async () => {
        const response = await api.get('/admin/schedules');
        return response.data;
    },

    createSchedule: async (scheduleData) => {
        const response = await api.post('/admin/schedules', scheduleData);
        return response.data;
    },

    updateSchedule: async (id, scheduleData) => {
        const response = await api.put(`/admin/schedules/${id}`, scheduleData);
        return response.data;
    },

    deleteSchedule: async (id) => {
        const response = await api.delete(`/admin/schedules/${id}`);
        return response.data;
    },
};

// User Management Services
export const userService = {
    getUsers: async (params) => {
        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    getUser: async (id) => {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },

    createUser: async (userData) => {
        const response = await api.post('/admin/users', userData);
        return response.data;
    },

    updateUser: async (id, userData) => {
        const response = await api.put(`/admin/users/${id}`, userData);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    toggleUserStatus: async (id) => {
        const response = await api.patch(`/admin/users/${id}/toggle-status`);
        return response.data;
    },
};

// System Health Services
export const systemService = {
    getHealthMetrics: async () => {
        const response = await api.get('/admin/system/health');
        return response.data;
    },

    getSystemLogs: async (params) => {
        const response = await api.get('/admin/system/logs', { params });
        return response.data;
    },
};

// Analytics Services
export const analyticsService = {
    getRevenueReports: async (params) => {
        const response = await api.get('/admin/analytics/revenue', { params });
        return response.data;
    },

    getTripAnalytics: async (params) => {
        const response = await api.get('/admin/analytics/trips', { params });
        return response.data;
    },

    exportReport: async (type, params) => {
        const response = await api.get(`/admin/analytics/export/${type}`, {
            params,
            responseType: 'blob',
        });
        return response.data;
    },
};

export default {
    auth: authService,
    dashboard: dashboardService,
    fleet: fleetService,
    user: userService,
    system: systemService,
    analytics: analyticsService,
};
