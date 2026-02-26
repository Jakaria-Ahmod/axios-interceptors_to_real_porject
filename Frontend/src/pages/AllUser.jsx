import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import api from '../axios';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  IdentificationIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const AllUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editForm, setEditForm] = useState({
    userName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    description: '',
    role: 'user',
    active: false,
  });

  // Fetch all users
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/auth/alluser');
      setUsers(res.data.allUser);
      setFilteredUsers(res.data.allUser);
    } catch (err) {
      console.error('Fetch failed:', err.response?.data || err.message);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Search filter
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        user =>
          user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Delete user
  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/auth/delete/${id}`);
        setUsers(prev => prev.filter(user => user._id !== id));
        toast.success('User deleted successfully');
      } catch (err) {
        console.error('Delete failed:', err.response?.data || err.message);
        toast.error('Delete failed');
      }
    }
  };

  // Toggle user active status
  const handleToggleActive = async user => {
    try {
      const newStatus = !user.active;
      const res = await api.put(`/auth/update/${user._id}`, {
        active: newStatus,
      });

      setUsers(prev =>
        prev.map(u => (u._id === user._id ? { ...u, active: newStatus } : u)),
      );

      toast.success(
        `User ${newStatus ? 'activated' : 'deactivated'} successfully`,
      );
    } catch (err) {
      console.error('Toggle failed:', err);
      toast.error('Failed to update user status');
    }
  };

  // View user
  const handleView = user => setViewUser(user);
  const closeView = () => setViewUser(null);

  // Edit user
  const handleEdit = user => {
    setEditUser(user);
    setEditForm({
      userName: user.userName || '',
      email: user.email || '',
      password: '',
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      description: user.description || '',
      role: user.role || 'user',
      active: user.active || false,
    });
  };

  const handleEditChange = e => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    if (!editUser) return;

    try {
      const res = await api.put(`/auth/update/${editUser._id}`, editForm);
      const updatedUser = res.data.updatedUser || res.data;

      setUsers(prev =>
        prev.map(user => (user._id === editUser._id ? updatedUser : user)),
      );

      toast.success('User updated successfully');
      setEditUser(null);
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      toast.error('Update failed');
    }
  };

  // Format date for display
  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get status badge color
  const getStatusBadge = active => {
    return active
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  // Get role badge color
  const getRoleBadge = role => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with Search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              View and manage all registered users
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.active).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Inactive</p>
            <p className="text-2xl font-bold text-gray-600">
              {users.filter(u => !u.active).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Users Grid */}
      {!isLoading && (
        <div className="max-w-7xl mx-auto">
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Card Header */}
                  <div
                    className={`px-6 py-4 ${user.active ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-gray-600 to-gray-700'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <UserCircleIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {user.userName || 'No Name'}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}
                            >
                              {user.role}
                            </span>
                            {user.active ? (
                              <span className="flex items-center text-green-200 text-xs">
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center text-gray-300 text-xs">
                                <XCircleIcon className="h-3 w-3 mr-1" />
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-white/60 text-sm">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 py-4 space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-sm truncate">{user.email}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-600">
                      <CalendarIcon className="h-5 w-5 text-green-500" />
                      <span className="text-sm">
                        {formatDate(user.dateOfBirth)}
                      </span>
                    </div>

                    <div className="flex items-start space-x-3 text-gray-600">
                      <IdentificationIcon className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm line-clamp-2">
                        {user.description || 'No description'}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer with Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleView(user)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        <EyeIcon className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(user)}
                        className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors text-sm font-medium ${
                          user.active
                            ? 'bg-gray-500 text-white hover:bg-gray-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {user.active ? (
                          <>
                            <XCircleIcon className="h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon className="h-4 w-4" />
                            Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <UserCircleIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  {searchTerm ? 'No Users Found' : 'No Users Yet'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? 'Try searching with a different name or email'
                    : 'There are no registered users yet.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <UserCircleIcon className="h-6 w-6" />
                  User Details
                </h2>
                <button
                  onClick={closeView}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-blue-50 p-4 rounded-lg flex-1">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    User Name
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {viewUser.userName}
                  </p>
                </div>
                <div className="ml-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(viewUser.role)}`}
                  >
                    {viewUser.role}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium mb-1">Email</p>
                <p className="text-gray-800">{viewUser.email}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium mb-1">
                  Date of Birth
                </p>
                <p className="text-gray-800">
                  {formatDate(viewUser.dateOfBirth)}
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600 font-medium mb-1">
                  Description
                </p>
                <p className="text-gray-800">
                  {viewUser.description || 'No description'}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${viewUser.active ? 'bg-green-50' : 'bg-gray-50'}`}
              >
                <p className="text-sm font-medium mb-1">Status</p>
                <div className="flex items-center">
                  {viewUser.active ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">Inactive</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={closeView}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <PencilIcon className="h-6 w-6" />
                  Edit User
                </h2>
                <button
                  onClick={() => setEditUser(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditSubmit} className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={editForm.userName}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Leave empty to keep current"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editForm.dateOfBirth}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={editForm.active}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Active Account
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
