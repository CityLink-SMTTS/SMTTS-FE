import React, { useState } from 'react';
import { mockUsers } from '../../utils/mockData';
import { useNotification } from '../../contexts/NotificationContext';

const UserManagement = () => {
  const { notify, confirm } = useNotification();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Commuter',
    status: 'Active'
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats calculations
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const drivers = users.filter(u => u.role === 'Driver').length;
  const admins = users.filter(u => u.role === 'Admin').length;

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...newUser } : u));
      notify.success(`User "${newUser.name}" has been updated successfully`, 'User Updated');
    } else {
      const user = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...newUser,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now'
      };
      setUsers([...users, user]);
      notify.success(`User "${newUser.name}" has been added successfully`, 'User Added');
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewUser({ name: '', email: '', role: 'Commuter', status: 'Active' });
    setShowAddModal(true);
  };

  const openEditModal = (user) => {
    setEditingId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowAddModal(true);
    setSelectedUser(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingId(null);
    setNewUser({ name: '', email: '', role: 'Commuter', status: 'Active' });
  };

  const handleDeleteUser = async (id) => {
    const user = users.find(u => u.id === id);
    const confirmed = await confirm(
      `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
      'Delete User'
    );

    if (confirmed) {
      setUsers(users.filter(u => u.id !== id));
      notify.success(`User "${user.name}" has been deleted`, 'User Deleted');
    }
  };

  const handleToggleStatus = (id) => {
    const user = users.find(u => u.id === id);
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';

    setUsers(users.map(u =>
      u.id === id ? { ...u, status: newStatus } : u
    ));

    notify.info(
      `User "${user.name}" status changed to ${newStatus}`,
      'Status Updated'
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">Manage all system users, drivers, and administrators</p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add New User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={totalUsers} icon="👥" color="bg-blue-500" />
        <StatCard title="Active Users" value={activeUsers} icon="✅" color="bg-green-500" />
        <StatCard title="Drivers" value={drivers} icon="🚗" color="bg-purple-500" />
        <StatCard title="Admins" value={admins} icon="👑" color="bg-orange-500" />
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full md:w-80">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Driver">Driver</option>
              <option value="Commuter">Commuter</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition flex items-center space-x-2">
              <span>📤</span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${user.role === 'Admin' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        user.role === 'Driver' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Driver' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                      {user.role === 'Admin' && '👑 '}
                      {user.role === 'Driver' && '🚗 '}
                      {user.role === 'Commuter' && '🎫 '}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition ${user.status === 'Active'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                      {user.status}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${user.lastActive === 'Online' ? 'text-green-600 font-medium' : 'text-gray-500'
                      }`}>
                      {user.lastActive === 'Online' && '🟢 '}
                      {user.lastActive}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-blue-600"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-green-600"
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-red-600"
                        title="Delete User"
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{totalUsers}</span> users
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{editingId ? 'Edit User' : 'Add New User'}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Commuter">Commuter</option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingId ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${selectedUser.role === 'Admin' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  selectedUser.role === 'Driver' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{selectedUser.name}</h4>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <DetailRow label="Role" value={selectedUser.role} />
                <DetailRow label="Status" value={selectedUser.status} />
                <DetailRow label="Join Date" value={selectedUser.joinDate} />
                <DetailRow label="Last Active" value={selectedUser.lastActive} />
              </div>
              <div className="mt-6 pt-4 border-t flex space-x-3">
                <button
                  onClick={() => openEditModal(selectedUser)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit User
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-xl text-white text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default UserManagement;
