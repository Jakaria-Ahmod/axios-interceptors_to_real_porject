import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-3">Al-Hadith</h3>
            <p className="text-gray-300 text-sm">
              Authentic hadith collection for the Ummah.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-gray-300 text-sm">Email: info@alhadith.com</p>
            <p className="text-gray-300 text-sm">Phone: +880 1234 567890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          © {currentYear} Al-Hadith. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
