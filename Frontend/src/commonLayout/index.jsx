import { useState } from 'react';
import { Link } from 'react-router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">UserApp</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/user" className="hover:text-gray-200">
            All User
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <span className="text-2xl">&#10005;</span> // X icon
            ) : (
              <span className="text-2xl">&#9776;</span> // ☰ icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-3 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/user"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-200"
          >
            All User
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
