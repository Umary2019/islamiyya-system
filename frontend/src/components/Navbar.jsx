import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center font-bold text-blue-900">
              IS
            </div>
            <div>
              <h1 className="text-2xl font-bold">Islamiyya School</h1>
              <p className="text-xs text-blue-200">Management System</p>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-blue-200 capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-blue-900 font-bold">
                    {user.name.charAt(0)}
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <button
                  onClick={handleLogout}
                  className="hidden md:block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="relative group">
                <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-medium transition">
                  Login
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link to="/admin" className="block px-4 py-3 hover:bg-gray-50 rounded-t-lg">
                    Login as Administrator
                  </Link>
                  <Link to="/staff" className="block px-4 py-3 hover:bg-gray-50">
                    Login as Staff/Teacher
                  </Link>
                  <Link to="/parent" className="block px-4 py-3 hover:bg-gray-50">
                    Login as Parent/Guardian
                  </Link>
                  <Link to="/student" className="block px-4 py-3 hover:bg-gray-50 rounded-b-lg">
                    Login as Student
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden pb-4 border-t border-blue-700">
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
