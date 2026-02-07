// ===== ADMIN DASHBOARD STATS =====
export const mockSystemStats = {
  // Trip Statistics
  totalTrips: 45892,
  tripsToday: 1256,
  tripsThisWeek: 8456,
  tripsThisMonth: 34521,
  
  // Revenue Summary
  dailyRevenue: 154200,
  weeklyRevenue: 985400,
  monthlyRevenue: 4125600,
  yearlyRevenue: 48560000,
  
  // Active Users
  totalUsers: 15420,
  activeUsers: 8945,
  newUsersToday: 45,
  newUsersThisWeek: 286,
  
  // Fleet Stats
  totalVehicles: 68,
  activeBuses: 35,
  activeTrains: 12,
  activeTaxis: 15,
  vehiclesInMaintenance: 6,
  
  // Route Stats
  totalRoutes: 24,
  activeRoutes: 20,
  
  // Driver Stats
  totalDrivers: 156,
  activeDrivers: 124,
  
  // System Health
  serverUptime: 99.97,
  systemHealth: 98,
  apiResponseTime: 45, // ms
  databaseStatus: 'Healthy',
  lastBackup: '2026-02-08 03:00 AM',
  
  // Additional
  avgTripDuration: '32 min',
  customerSatisfaction: 4.6,
  alerts: 2
};

// ===== SYSTEM HEALTH =====
export const mockSystemHealth = {
  servers: [
    { name: 'Primary Server', status: 'Online', uptime: '99.97%', cpu: 45, memory: 62, location: 'US-East' },
    { name: 'Backup Server', status: 'Standby', uptime: '99.99%', cpu: 12, memory: 35, location: 'US-West' },
    { name: 'Database Server', status: 'Online', uptime: '99.95%', cpu: 58, memory: 71, location: 'US-East' },
  ],
  services: [
    { name: 'Payment Gateway', status: 'Operational', latency: '23ms' },
    { name: 'GPS Tracking', status: 'Operational', latency: '15ms' },
    { name: 'Notification Service', status: 'Operational', latency: '45ms' },
    { name: 'Analytics Engine', status: 'Operational', latency: '120ms' },
  ],
  recentIncidents: [
    { id: 1, title: 'Scheduled Maintenance', description: 'Database optimization completed', time: '2 hours ago', resolved: true },
    { id: 2, title: 'Minor Latency Spike', description: 'API response time briefly elevated', time: '1 day ago', resolved: true },
  ]
};

// ===== VEHICLES (Bus, Train, Taxi) =====
export const mockVehicles = [
  // Buses
  { id: 1, vehicleNumber: 'BUS-001', type: 'Bus', licensePlate: 'NB-1234', status: 'Active', route: 'R-001', capacity: 50, currentPassengers: 32, fuelLevel: 75, lastMaintenance: '2024-01-15', driver: 'John Silva', model: 'Volvo B8R', year: 2022 },
  { id: 2, vehicleNumber: 'BUS-002', type: 'Bus', licensePlate: 'NB-5678', status: 'Maintenance', route: null, capacity: 50, currentPassengers: 0, fuelLevel: 0, lastMaintenance: '2024-01-20', driver: null, model: 'Mercedes Citaro', year: 2021 },
  { id: 3, vehicleNumber: 'BUS-003', type: 'Bus', licensePlate: 'NA-9012', status: 'Active', route: 'R-002', capacity: 45, currentPassengers: 28, fuelLevel: 82, lastMaintenance: '2024-01-25', driver: 'Priya Kumar', model: 'Volvo B8R', year: 2023 },
  { id: 4, vehicleNumber: 'BUS-004', type: 'Bus', licensePlate: 'NC-3456', status: 'Idle', route: null, capacity: 50, currentPassengers: 0, fuelLevel: 40, lastMaintenance: '2024-01-10', driver: 'Mike Fernando', model: 'Scania Citywide', year: 2022 },
  { id: 5, vehicleNumber: 'BUS-005', type: 'Bus', licensePlate: 'ND-7890', status: 'Active', route: 'R-001', capacity: 55, currentPassengers: 41, fuelLevel: 60, lastMaintenance: '2024-01-05', driver: 'Sarah Perera', model: 'MAN Lion\'s City', year: 2023 },
  // Trains
  { id: 6, vehicleNumber: 'TRN-001', type: 'Train', licensePlate: 'TR-001', status: 'Active', route: 'R-010', capacity: 200, currentPassengers: 145, fuelLevel: 90, lastMaintenance: '2024-01-12', driver: 'Alex Johnson', model: 'Metro Rail S200', year: 2021 },
  { id: 7, vehicleNumber: 'TRN-002', type: 'Train', licensePlate: 'TR-002', status: 'Active', route: 'R-011', capacity: 200, currentPassengers: 178, fuelLevel: 85, lastMaintenance: '2024-01-18', driver: 'Emma Wilson', model: 'Metro Rail S200', year: 2022 },
  { id: 8, vehicleNumber: 'TRN-003', type: 'Train', licensePlate: 'TR-003', status: 'Maintenance', route: null, capacity: 250, currentPassengers: 0, fuelLevel: 0, lastMaintenance: '2024-01-08', driver: null, model: 'Metro Rail S300', year: 2020 },
  // Taxis
  { id: 9, vehicleNumber: 'TXI-001', type: 'Taxi', licensePlate: 'TX-1234', status: 'Active', route: 'On-Demand', capacity: 4, currentPassengers: 2, fuelLevel: 65, lastMaintenance: '2024-01-22', driver: 'Raj Patel', model: 'Toyota Prius', year: 2023 },
  { id: 10, vehicleNumber: 'TXI-002', type: 'Taxi', licensePlate: 'TX-5678', status: 'Active', route: 'On-Demand', capacity: 4, currentPassengers: 1, fuelLevel: 80, lastMaintenance: '2024-01-19', driver: 'Lisa Chen', model: 'Honda Civic', year: 2022 },
  { id: 11, vehicleNumber: 'TXI-003', type: 'Taxi', licensePlate: 'TX-9012', status: 'Idle', route: null, capacity: 6, currentPassengers: 0, fuelLevel: 55, lastMaintenance: '2024-01-15', driver: 'David Lee', model: 'Toyota Alphard', year: 2023 },
];

// ===== ROUTES =====
export const mockRoutes = [
  { id: 'R-001', name: 'City Loop A', start: 'Central Station', end: 'Mall', distance: '12km', estimatedTime: '45m', fare: 50, vehicleType: 'Bus', assignedVehicles: ['BUS-001', 'BUS-005'], status: 'Active' },
  { id: 'R-002', name: 'Suburb Express', start: 'North Park', end: 'Downtown', distance: '25km', estimatedTime: '60m', fare: 80, vehicleType: 'Bus', assignedVehicles: ['BUS-003'], status: 'Active' },
  { id: 'R-003', name: 'Uni Shuttle', start: 'Central Station', end: 'University', distance: '8km', estimatedTime: '30m', fare: 35, vehicleType: 'Bus', assignedVehicles: [], status: 'Active' },
  { id: 'R-004', name: 'Airport Express', start: 'Central Station', end: 'Airport', distance: '35km', estimatedTime: '50m', fare: 150, vehicleType: 'Bus', assignedVehicles: [], status: 'Active' },
  { id: 'R-005', name: 'Beach Route', start: 'Downtown', end: 'Beach Park', distance: '15km', estimatedTime: '40m', fare: 60, vehicleType: 'Bus', assignedVehicles: [], status: 'Inactive' },
  { id: 'R-010', name: 'Metro Line 1', start: 'Central Terminal', end: 'Tech Park', distance: '20km', estimatedTime: '25m', fare: 45, vehicleType: 'Train', assignedVehicles: ['TRN-001'], status: 'Active' },
  { id: 'R-011', name: 'Metro Line 2', start: 'Airport', end: 'City Center', distance: '30km', estimatedTime: '35m', fare: 65, vehicleType: 'Train', assignedVehicles: ['TRN-002'], status: 'Active' },
];

// ===== SCHEDULES =====
export const mockSchedules = [
  { id: 'SCH-001', routeId: 'R-001', routeName: 'City Loop A', vehicleNumber: 'BUS-001', driver: 'John Silva', departureTime: '06:00', arrivalTime: '06:45', frequency: 'Daily', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  { id: 'SCH-002', routeId: 'R-001', routeName: 'City Loop A', vehicleNumber: 'BUS-005', driver: 'Sarah Perera', departureTime: '06:30', arrivalTime: '07:15', frequency: 'Daily', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  { id: 'SCH-003', routeId: 'R-001', routeName: 'City Loop A', vehicleNumber: 'BUS-001', driver: 'John Silva', departureTime: '08:00', arrivalTime: '08:45', frequency: 'Peak Hours', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { id: 'SCH-004', routeId: 'R-002', routeName: 'Suburb Express', vehicleNumber: 'BUS-003', driver: 'Priya Kumar', departureTime: '07:00', arrivalTime: '08:00', frequency: 'Daily', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  { id: 'SCH-005', routeId: 'R-002', routeName: 'Suburb Express', vehicleNumber: 'BUS-003', driver: 'Priya Kumar', departureTime: '17:30', arrivalTime: '18:30', frequency: 'Peak Hours', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { id: 'SCH-006', routeId: 'R-010', routeName: 'Metro Line 1', vehicleNumber: 'TRN-001', driver: 'Alex Johnson', departureTime: '05:30', arrivalTime: '05:55', frequency: 'Every 15 min', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  { id: 'SCH-007', routeId: 'R-011', routeName: 'Metro Line 2', vehicleNumber: 'TRN-002', driver: 'Emma Wilson', departureTime: '06:00', arrivalTime: '06:35', frequency: 'Every 20 min', status: 'Active', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  { id: 'SCH-008', routeId: 'R-003', routeName: 'Uni Shuttle', vehicleNumber: '', driver: '', departureTime: '07:30', arrivalTime: '08:00', frequency: 'Daily', status: 'Pending', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
];

// ===== PERFORMANCE DATA =====
export const mockPerformanceData = [
  { time: '08:00', load: 45, trips: 120 },
  { time: '10:00', load: 75, trips: 185 },
  { time: '12:00', load: 60, trips: 156 },
  { time: '14:00', load: 55, trips: 142 },
  { time: '16:00', load: 85, trips: 198 },
  { time: '18:00', load: 90, trips: 215 },
  { time: '20:00', load: 40, trips: 98 },
];

// ===== REVENUE DATA =====
export const mockRevenueData = [
  { day: 'Mon', revenue: 142500, trips: 1245 },
  { day: 'Tue', revenue: 158200, trips: 1356 },
  { day: 'Wed', revenue: 135800, trips: 1189 },
  { day: 'Thu', revenue: 167400, trips: 1423 },
  { day: 'Fri', revenue: 189600, trips: 1567 },
  { day: 'Sat', revenue: 112300, trips: 987 },
  { day: 'Sun', revenue: 79600, trips: 689 },
];

// ===== RECENT ACTIVITIES =====
export const mockRecentActivities = [
  { id: 1, type: 'vehicle', message: 'Bus BUS-002 entered maintenance mode', time: '5 min ago', severity: 'warning' },
  { id: 2, type: 'user', message: 'New driver registration: Alex Johnson', time: '15 min ago', severity: 'info' },
  { id: 3, type: 'route', message: 'Route R-003 schedule updated', time: '32 min ago', severity: 'success' },
  { id: 4, type: 'alert', message: 'Low fuel alert for Bus BUS-004', time: '1 hour ago', severity: 'warning' },
  { id: 5, type: 'payment', message: 'Daily revenue target achieved', time: '2 hours ago', severity: 'success' },
  { id: 6, type: 'system', message: 'System health check completed', time: '3 hours ago', severity: 'info' },
];

// ===== USERS =====
export const mockUsers = [
  { id: 1, name: 'John Silva', email: 'john.silva@email.com', role: 'Driver', status: 'Active', joinDate: '2023-05-15', lastActive: '2 min ago' },
  { id: 2, name: 'Priya Kumar', email: 'priya.k@email.com', role: 'Driver', status: 'Active', joinDate: '2023-06-20', lastActive: '10 min ago' },
  { id: 3, name: 'Mike Fernando', email: 'mike.f@email.com', role: 'Driver', status: 'Inactive', joinDate: '2023-04-10', lastActive: '2 days ago' },
  { id: 4, name: 'Sarah Perera', email: 'sarah.p@email.com', role: 'Admin', status: 'Active', joinDate: '2023-01-05', lastActive: 'Online' },
  { id: 5, name: 'David Lee', email: 'david.l@email.com', role: 'Commuter', status: 'Active', joinDate: '2023-08-22', lastActive: '1 hour ago' },
  { id: 6, name: 'Emma Wilson', email: 'emma.w@email.com', role: 'Driver', status: 'Active', joinDate: '2023-09-10', lastActive: '30 min ago' },
  { id: 7, name: 'Raj Patel', email: 'raj.p@email.com', role: 'Driver', status: 'Active', joinDate: '2023-07-18', lastActive: '5 min ago' },
  { id: 8, name: 'Lisa Chen', email: 'lisa.c@email.com', role: 'Admin', status: 'Active', joinDate: '2022-11-30', lastActive: 'Online' },
];

// ===== ALERTS =====
export const mockAlerts = [
  { id: 1, title: 'Maintenance Due', message: 'Bus BUS-002 requires scheduled maintenance', type: 'warning', time: '10 min ago' },
  { id: 2, title: 'Route Delay', message: 'Route R-002 experiencing 15 min delay due to traffic', type: 'info', time: '25 min ago' },
];
