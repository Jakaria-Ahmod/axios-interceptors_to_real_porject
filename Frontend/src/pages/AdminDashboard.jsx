import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import api from '../axios';
import {
  UsersIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalHadith: 0,
    reports: 0,
    newUsersToday: 0,
    pendingApprovals: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total users
        const usersRes = await api.get('/auth/alluser');
        const users = usersRes.data.allUser || [];

        // Count active users (where active === true)
        const activeUsersCount = users.filter(
          user => user.active === true,
        ).length;

        // Count new users today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newUsersToday = users.filter(user => {
          const createdAt = new Date(user.createdAt);
          return createdAt >= today;
        }).length;

        // Update stats with real data
        setStats({
          totalUsers: users.length,
          activeUsers: activeUsersCount,
          totalHadith: 5000, // Replace with actual API call
          reports: 23, // Replace with actual API call
          newUsersToday: newUsersToday,
          pendingApprovals: 5, // Replace with actual API call
        });

        // Get recent users (last 5)
        setRecentUsers(users.slice(-5).reverse());
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle view all users
  const handleViewAllUsers = () => {
    navigate('/user');
  };

  // Handle search
  const handleSearch = e => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/user?search=${searchTerm}`);
    }
  };

  // Stats cards data with real active users
  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: `+${stats.newUsersToday} today`,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserGroupIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      change: `${Math.round((stats.activeUsers / stats.totalUsers) * 100) || 0}% online`,
    },
    {
      title: 'Total Hadith',
      value: stats.totalHadith.toLocaleString(),
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: '+120 this week',
    },
    {
      title: 'Reports',
      value: stats.reports,
      icon: ChartBarIcon,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      change: '-2 from yesterday',
    },
    {
      title: 'New Today',
      value: stats.newUsersToday,
      icon: ArrowTrendingUpIcon,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      change: 'new users',
    },
    {
      title: 'Pending',
      value: stats.pendingApprovals,
      icon: ShieldCheckIcon,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      change: 'need review',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, Admin!
          </h2>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your dashboard today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.textColor}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity and Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Users
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">
                      User
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">
                      Email
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, index) => (
                    <tr
                      key={user._id || index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.userName?.[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {user.userName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleViewAllUsers}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Users →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/register')}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Add New User
              </button>
              <button
                onClick={() => navigate('/hadith')}
                className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                Manage Hadith
              </button>
              <button
                onClick={() => navigate('/reports')}
                className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                View Reports
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
              >
                System Settings
              </button>
            </div>

            {/* System Status */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                System Status
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm font-medium text-green-600">
                    45%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '45%' }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="text-sm font-medium text-blue-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm font-medium text-purple-600">
                    {stats.activeUsers}/{stats.totalUsers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
