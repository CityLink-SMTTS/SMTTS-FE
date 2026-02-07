import React, { useState } from 'react';
import { mockVehicles, mockRoutes, mockSchedules } from '../../utils/mockData';

const FleetManagement = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [routes, setRoutes] = useState(mockRoutes);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showEditRouteModal, setShowEditRouteModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState('');

  // New Vehicle Form State
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: '',
    type: 'Bus',
    licensePlate: '',
    status: 'Idle',
    route: null,
    capacity: 50,
    model: '',
    year: new Date().getFullYear(),
    driver: null
  });

  // New Route Form State
  const [newRoute, setNewRoute] = useState({
    id: '',
    name: '',
    start: '',
    end: '',
    distance: '',
    estimatedTime: '',
    fare: 0,
    vehicleType: 'Bus',
    assignedVehicles: [],
    status: 'Active'
  });

  // New Schedule Form State
  const [newSchedule, setNewSchedule] = useState({
    id: '',
    routeId: '',
    routeName: '',
    vehicleNumber: '',
    driver: '',
    departureTime: '',
    arrivalTime: '',
    frequency: 'Daily',
    status: 'Active',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  });

  // Filter vehicles
  const filteredVehicles = vehicles.filter(v => {
    const matchesType = filterType === 'All' || v.type === filterType;
    const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
    const matchesSearch = v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // Stats
  const totalBuses = vehicles.filter(v => v.type === 'Bus').length;
  const totalTrains = vehicles.filter(v => v.type === 'Train').length;
  const totalTaxis = vehicles.filter(v => v.type === 'Taxi').length;
  const activeVehicles = vehicles.filter(v => v.status === 'Active').length;

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      id: vehicles.length + 1,
      ...newVehicle,
      currentPassengers: 0,
      fuelLevel: 100,
      lastMaintenance: new Date().toISOString().split('T')[0]
    };
    setVehicles([...vehicles, vehicle]);
    setShowAddModal(false);
    resetNewVehicle();
  };

  const handleEditVehicle = (e) => {
    e.preventDefault();
    setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? selectedVehicle : v));
    setShowEditModal(false);
    setSelectedVehicle(null);
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleAssignVehicle = () => {
    if (selectedVehicle && selectedRoute) {
      // Update vehicle with new route
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...v, route: selectedRoute.id, status: 'Active' } : v
      ));
      // Update route with assigned vehicle
      setRoutes(routes.map(r => 
        r.id === selectedRoute.id 
          ? { ...r, assignedVehicles: [...(r.assignedVehicles || []), selectedVehicle.vehicleNumber] }
          : r
      ));
      setShowAssignModal(false);
      setSelectedVehicle(null);
      setSelectedRoute(null);
    }
  };

  const resetNewVehicle = () => {
    setNewVehicle({
      vehicleNumber: '',
      type: 'Bus',
      licensePlate: '',
      status: 'Idle',
      route: null,
      capacity: 50,
      model: '',
      year: new Date().getFullYear(),
      driver: null
    });
  };

  // Route CRUD Handlers
  const handleAddRoute = (e) => {
    e.preventDefault();
    const route = {
      ...newRoute,
      id: `R-${String(routes.length + 1).padStart(3, '0')}`,
    };
    setRoutes([...routes, route]);
    setShowAddRouteModal(false);
    resetNewRoute();
  };

  const handleEditRoute = (e) => {
    e.preventDefault();
    setRoutes(routes.map(r => r.id === selectedRoute.id ? selectedRoute : r));
    setShowEditRouteModal(false);
    setSelectedRoute(null);
  };

  const handleDeleteRoute = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(r => r.id !== id));
      // Also remove schedules for this route
      setSchedules(schedules.filter(s => s.routeId !== id));
    }
  };

  const resetNewRoute = () => {
    setNewRoute({
      id: '',
      name: '',
      start: '',
      end: '',
      distance: '',
      estimatedTime: '',
      fare: 0,
      vehicleType: 'Bus',
      assignedVehicles: [],
      status: 'Active'
    });
  };

  // Schedule CRUD Handlers
  const handleAddSchedule = (e) => {
    e.preventDefault();
    const selectedRouteData = routes.find(r => r.id === newSchedule.routeId);
    const schedule = {
      ...newSchedule,
      id: `SCH-${String(schedules.length + 1).padStart(3, '0')}`,
      routeName: selectedRouteData?.name || ''
    };
    setSchedules([...schedules, schedule]);
    setShowAddScheduleModal(false);
    resetNewSchedule();
  };

  const handleEditSchedule = (e) => {
    e.preventDefault();
    setSchedules(schedules.map(s => s.id === selectedSchedule.id ? selectedSchedule : s));
    setShowEditScheduleModal(false);
    setSelectedSchedule(null);
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const resetNewSchedule = () => {
    setNewSchedule({
      id: '',
      routeId: '',
      routeName: '',
      vehicleNumber: '',
      driver: '',
      departureTime: '',
      arrivalTime: '',
      frequency: 'Daily',
      status: 'Active',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    });
  };

  // Filter schedules
  const filteredSchedules = schedules.filter(s => {
    const matchesSearch = s.routeName.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) ||
                          s.vehicleNumber.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(scheduleSearchQuery.toLowerCase());
    return matchesSearch;
  });

  const getVehicleIcon = (type) => {
    switch(type) {
      case 'Bus': return '🚌';
      case 'Train': return '🚆';
      case 'Taxi': return '🚕';
      default: return '🚗';
    }
  };

  const getTypeGradient = (type) => {
    switch(type) {
      case 'Bus': return 'from-teal-500 to-emerald-500';
      case 'Train': return 'from-cyan-500 to-blue-500';
      case 'Taxi': return 'from-amber-500 to-orange-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Fleet Management</h1>
          <p className="text-slate-500 mt-1">Manage vehicles and route assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition flex items-center space-x-2 shadow-lg shadow-teal-500/20"
        >
          <span className="text-lg">+</span>
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🚌" label="Buses" value={totalBuses} gradient="from-teal-500 to-emerald-500" />
        <StatCard icon="🚆" label="Trains" value={totalTrains} gradient="from-cyan-500 to-blue-500" />
        <StatCard icon="🚕" label="Taxis" value={totalTaxis} gradient="from-amber-500 to-orange-500" />
        <StatCard icon="✅" label="Active" value={activeVehicles} gradient="from-green-500 to-emerald-600" />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'vehicles'
              ? 'bg-white text-slate-800 shadow-lg'
              : 'bg-transparent text-slate-500 hover:bg-white/50'
          }`}
        >
          🚌 Vehicles
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'routes'
              ? 'bg-white text-slate-800 shadow-lg'
              : 'bg-transparent text-slate-500 hover:bg-white/50'
          }`}
        >
          🛣️ Routes
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'schedules'
              ? 'bg-white text-slate-800 shadow-lg'
              : 'bg-transparent text-slate-500 hover:bg-white/50'
          }`}
        >
          📅 Schedules
        </button>
      </div>

      {/* Vehicle Management Tab */}
      {activeTab === 'vehicles' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-full md:w-80">
              <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vehicles..."
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Types</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Taxi">Taxi</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Vehicle Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Capacity</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fuel</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getTypeGradient(vehicle.type)} flex items-center justify-center text-white`}>
                          {getVehicleIcon(vehicle.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{vehicle.vehicleNumber}</p>
                          <p className="text-xs text-slate-500">{vehicle.licensePlate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getTypeGradient(vehicle.type)} text-white`}>
                        {vehicle.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === 'Active' ? 'bg-green-100 text-green-700' :
                        vehicle.status === 'Maintenance' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          vehicle.status === 'Active' ? 'bg-green-500' :
                          vehicle.status === 'Maintenance' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></span>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {vehicle.route || <span className="text-slate-400">Unassigned</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600">{vehicle.currentPassengers}/{vehicle.capacity}</span>
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${(vehicle.currentPassengers / vehicle.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              vehicle.fuelLevel > 50 ? 'bg-green-500' : vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500">{vehicle.fuelLevel}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setShowAssignModal(true);
                          }}
                          className="p-2 hover:bg-teal-50 rounded-lg transition text-teal-600"
                          title="Assign to Route"
                        >
                          🛣️
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedVehicle({...vehicle});
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                          title="Edit Vehicle"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          title="Delete Vehicle"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Route Management Tab */}
      {activeTab === 'routes' && (
        <>
          {/* Route Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-slate-500">
              Total Routes: <span className="font-semibold text-slate-800">{routes.length}</span> | 
              Active: <span className="font-semibold text-green-600">{routes.filter(r => r.status === 'Active').length}</span>
            </div>
            <button
              onClick={() => setShowAddRouteModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <span>+</span>
              <span>Add Route</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className={`h-2 bg-gradient-to-r ${
                  route.vehicleType === 'Bus' ? 'from-teal-500 to-emerald-500' :
                  route.vehicleType === 'Train' ? 'from-cyan-500 to-blue-500' :
                  'from-amber-500 to-orange-500'
                }`}></div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getVehicleIcon(route.vehicleType)}</span>
                      <div>
                        <h3 className="font-bold text-slate-800">{route.name}</h3>
                        <span className="text-xs text-slate-500">{route.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        route.status === 'Active' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {route.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-green-500">●</span>
                      <span className="text-slate-500">From:</span>
                      <span className="text-slate-700 font-medium">{route.start}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-red-500">●</span>
                      <span className="text-slate-500">To:</span>
                      <span className="text-slate-700 font-medium">{route.end}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span>{route.distance}</span>
                    <span>{route.estimatedTime}</span>
                    <span className="font-medium text-slate-700">Rs. {route.fare}</span>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Assigned Vehicles ({route.assignedVehicles?.length || 0})</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {route.assignedVehicles?.length > 0 ? (
                        route.assignedVehicles.map((v, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            {v}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">No vehicles assigned</span>
                      )}
                    </div>
                    {/* Route Actions */}
                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                      <button 
                        onClick={() => {
                          setSelectedRoute({...route});
                          setShowEditRouteModal(true);
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                        title="Edit Route"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteRoute(route.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                        title="Delete Route"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Schedule Management Tab */}
      {activeTab === 'schedules' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Schedule Header */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-full md:w-80">
              <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search schedules..."
                className="bg-transparent border-none outline-none text-sm w-full"
                value={scheduleSearchQuery}
                onChange={(e) => setScheduleSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowAddScheduleModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition flex items-center space-x-2 shadow-lg shadow-amber-500/20"
            >
              <span>+</span>
              <span>Add Schedule</span>
            </button>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule ID</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Driver</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Days</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-slate-700">{schedule.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-800">{schedule.routeName}</p>
                        <p className="text-xs text-slate-500">{schedule.routeId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {schedule.vehicleNumber ? (
                        <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm">{schedule.vehicleNumber}</span>
                      ) : (
                        <span className="text-slate-400 text-sm">Unassigned</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {schedule.driver || <span className="text-slate-400">Unassigned</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <span className="text-slate-700 font-medium">{schedule.departureTime}</span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span className="text-slate-700 font-medium">{schedule.arrivalTime}</span>
                      </div>
                      <p className="text-xs text-slate-500">{schedule.frequency}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {schedule.days?.map((day, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                            {day}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        schedule.status === 'Active' ? 'bg-green-100 text-green-700' :
                        schedule.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          schedule.status === 'Active' ? 'bg-green-500' :
                          schedule.status === 'Pending' ? 'bg-yellow-500' :
                          'bg-slate-400'
                        }`}></span>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedSchedule({...schedule});
                            setShowEditScheduleModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600"
                          title="Edit Schedule"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          title="Delete Schedule"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <Modal title="Add New Vehicle" onClose={() => setShowAddModal(false)}>
          <form onSubmit={handleAddVehicle} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., BUS-006"
                  value={newVehicle.vehicleNumber}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={newVehicle.type}
                  onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                >
                  <option value="Bus">🚌 Bus</option>
                  <option value="Train">🚆 Train</option>
                  <option value="Taxi">🚕 Taxi</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">License Plate</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., NB-1234"
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle({ ...newVehicle, capacity: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., Volvo B8R"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Vehicle Modal */}
      {showEditModal && selectedVehicle && (
        <Modal title="Edit Vehicle" onClose={() => { setShowEditModal(false); setSelectedVehicle(null); }}>
          <form onSubmit={handleEditVehicle} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.vehicleNumber}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, vehicleNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.type}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, type: e.target.value })}
                >
                  <option value="Bus">🚌 Bus</option>
                  <option value="Train">🚆 Train</option>
                  <option value="Taxi">🚕 Taxi</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">License Plate</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.licensePlate}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, licensePlate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.status}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Idle">Idle</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.capacity}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, capacity: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Level (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedVehicle.fuelLevel}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fuelLevel: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => { setShowEditModal(false); setSelectedVehicle(null); }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Assign to Route Modal */}
      {showAssignModal && selectedVehicle && (
        <Modal title="Assign Vehicle to Route" onClose={() => { setShowAssignModal(false); setSelectedVehicle(null); setSelectedRoute(null); }}>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">Selected Vehicle</p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getVehicleIcon(selectedVehicle.type)}</span>
                <div>
                  <p className="font-semibold text-slate-800">{selectedVehicle.vehicleNumber}</p>
                  <p className="text-xs text-slate-500">{selectedVehicle.type} • {selectedVehicle.licensePlate}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Route</label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {routes.filter(r => r.vehicleType === selectedVehicle.type || selectedVehicle.type === 'Taxi').map((route) => (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-3 border rounded-lg cursor-pointer transition ${
                      selectedRoute?.id === route.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-800">{route.name}</p>
                        <p className="text-xs text-slate-500">{route.start} → {route.end}</p>
                      </div>
                      <span className="text-xs text-slate-400">{route.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => { setShowAssignModal(false); setSelectedVehicle(null); setSelectedRoute(null); }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignVehicle}
                disabled={!selectedRoute}
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  selectedRoute
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:opacity-90'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Assign Vehicle
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Route Modal */}
      {showAddRouteModal && (
        <Modal title="Add New Route" onClose={() => setShowAddRouteModal(false)}>
          <form onSubmit={handleAddRoute} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., City Express"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={newRoute.vehicleType}
                  onChange={(e) => setNewRoute({ ...newRoute, vehicleType: e.target.value })}
                >
                  <option value="Bus">🚌 Bus</option>
                  <option value="Train">🚆 Train</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Point</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., Central Station"
                  value={newRoute.start}
                  onChange={(e) => setNewRoute({ ...newRoute, start: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Point</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., Airport"
                  value={newRoute.end}
                  onChange={(e) => setNewRoute({ ...newRoute, end: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Distance</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., 15km"
                  value={newRoute.distance}
                  onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Est. Time</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., 45m"
                  value={newRoute.estimatedTime}
                  onChange={(e) => setNewRoute({ ...newRoute, estimatedTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fare (Rs.)</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={newRoute.fare}
                  onChange={(e) => setNewRoute({ ...newRoute, fare: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddRouteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Add Route
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Route Modal */}
      {showEditRouteModal && selectedRoute && (
        <Modal title="Edit Route" onClose={() => { setShowEditRouteModal(false); setSelectedRoute(null); }}>
          <form onSubmit={handleEditRoute} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.name}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.status || 'Active'}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Point</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.start}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, start: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Point</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.end}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, end: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Distance</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.distance}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, distance: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Est. Time</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.estimatedTime}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, estimatedTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fare (Rs.)</label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedRoute.fare}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, fare: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => { setShowEditRouteModal(false); setSelectedRoute(null); }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <Modal title="Add New Schedule" onClose={() => setShowAddScheduleModal(false)}>
          <form onSubmit={handleAddSchedule} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Route</label>
              <select
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={newSchedule.routeId}
                onChange={(e) => {
                  const route = routes.find(r => r.id === e.target.value);
                  setNewSchedule({ ...newSchedule, routeId: e.target.value, routeName: route?.name || '' });
                }}
              >
                <option value="">Select a route...</option>
                {routes.map(route => (
                  <option key={route.id} value={route.id}>{route.name} ({route.id})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newSchedule.vehicleNumber}
                  onChange={(e) => setNewSchedule({ ...newSchedule, vehicleNumber: e.target.value })}
                >
                  <option value="">Select vehicle...</option>
                  {vehicles.filter(v => v.status !== 'Maintenance').map(vehicle => (
                    <option key={vehicle.id} value={vehicle.vehicleNumber}>{vehicle.vehicleNumber} ({vehicle.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Driver</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Driver name"
                  value={newSchedule.driver}
                  onChange={(e) => setNewSchedule({ ...newSchedule, driver: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newSchedule.departureTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, departureTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Arrival Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newSchedule.arrivalTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, arrivalTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                >
                  <option value="Daily">Daily</option>
                  <option value="Peak Hours">Peak Hours</option>
                  <option value="Every 15 min">Every 15 min</option>
                  <option value="Every 20 min">Every 20 min</option>
                  <option value="Every 30 min">Every 30 min</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={newSchedule.status}
                  onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Operating Days</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const days = newSchedule.days.includes(day)
                        ? newSchedule.days.filter(d => d !== day)
                        : [...newSchedule.days, day];
                      setNewSchedule({ ...newSchedule, days });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      newSchedule.days.includes(day)
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Add Schedule
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Schedule Modal */}
      {showEditScheduleModal && selectedSchedule && (
        <Modal title="Edit Schedule" onClose={() => { setShowEditScheduleModal(false); setSelectedSchedule(null); }}>
          <form onSubmit={handleEditSchedule} className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-3 mb-2">
              <p className="text-sm text-slate-600">
                <span className="font-medium">{selectedSchedule.id}</span> - {selectedSchedule.routeName}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.vehicleNumber}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, vehicleNumber: e.target.value })}
                >
                  <option value="">Select vehicle...</option>
                  {vehicles.filter(v => v.status !== 'Maintenance').map(vehicle => (
                    <option key={vehicle.id} value={vehicle.vehicleNumber}>{vehicle.vehicleNumber} ({vehicle.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Driver</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.driver}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, driver: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.departureTime}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, departureTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Arrival Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.arrivalTime}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, arrivalTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.frequency}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, frequency: e.target.value })}
                >
                  <option value="Daily">Daily</option>
                  <option value="Peak Hours">Peak Hours</option>
                  <option value="Every 15 min">Every 15 min</option>
                  <option value="Every 20 min">Every 20 min</option>
                  <option value="Every 30 min">Every 30 min</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedSchedule.status}
                  onChange={(e) => setSelectedSchedule({ ...selectedSchedule, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Operating Days</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const days = selectedSchedule.days?.includes(day)
                        ? selectedSchedule.days.filter(d => d !== day)
                        : [...(selectedSchedule.days || []), day];
                      setSelectedSchedule({ ...selectedSchedule, days });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      selectedSchedule.days?.includes(day)
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => { setShowEditScheduleModal(false); setSelectedSchedule(null); }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, gradient }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

// Modal Component
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

export default FleetManagement;
