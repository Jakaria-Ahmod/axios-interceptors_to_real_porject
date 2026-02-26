import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import api from '../axios';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Check for logged in user on mount and storage changes
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');

      console.log('Checking user:', storedUser, 'Token:', accessToken); // Debug log

      if (storedUser && accessToken) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for storage changes (login in another tab)
    const handleStorageChange = () => {
      console.log('Storage changed'); // Debug log
      checkUser();
    };

    // Custom event for login/logout
    const handleAuthChange = () => {
      console.log('Auth changed'); // Debug log
      checkUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API to set active = false
      await api.post('/auth/logout');

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Show success message
      toast.success('Logged out successfully');

      // Redirect to login
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed');
    }
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (!user) return '#';
    return user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
  };

  // Get menu items based on user role
  const getMenuItems = () => {
    const commonItems = [{ name: 'Home', path: '/' }];

    if (!user) {
      return [...commonItems];
    }

    // Logged in user menu
    const userItems = [
      ...commonItems,
      { name: 'Hadith', path: '/hadith' },
      { name: 'Collections', path: '/collections' },
    ];

    // Admin gets additional items
    if (user.role === 'admin') {
      return [
        ...userItems,
        { name: 'Manage Users', path: '/admin/users' },
        { name: 'Analytics', path: '/admin/analytics' },
      ];
    }

    return userItems;
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:opacity-80 transition">
            Al-Hadith
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {getMenuItems().map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-blue-200 transition font-medium"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="relative ml-4">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full pl-3 pr-1 py-1 transition"
              >
                <span className="text-sm font-medium">
                  {user.name || user.email || 'User'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </span>
                </div>
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 py-2 text-gray-800">
                    <Link
                      to={getDashboardLink()}
                      onClick={() => {
                        setShowDropdown(false);
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-blue-50 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => {
                        setShowDropdown(false);
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-blue-50 transition"
                    >
                      Profile
                    </Link>

                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-white rounded-lg hover:bg-white/10 transition font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700/95 backdrop-blur-sm px-4 py-4 space-y-3 border-t border-white/20">
          {getMenuItems().map(item => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 hover:bg-white/10 rounded-lg transition"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="border-t border-white/20 my-2"></div>
              <div className="px-3 py-2 text-sm text-white/80">
                Logged in as{' '}
                <span className="font-bold text-white">
                  {user.name || user.email}
                </span>
                <span className="ml-2 text-xs bg-blue-500 px-2 py-0.5 rounded-full">
                  {user.role || 'user'}
                </span>
              </div>
              <Link
                to={getDashboardLink()}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 hover:bg-white/10 rounded-lg transition"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 hover:bg-white/10 rounded-lg transition"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 hover:bg-white/10 rounded-lg transition"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-3 hover:bg-red-600/20 text-red-200 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition text-center font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 border border-white rounded-lg hover:bg-white/10 transition text-center font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
