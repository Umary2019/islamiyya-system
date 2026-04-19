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

  const roleLinks = [
    { path: '/admin', label: 'Administrator' },
    { path: '/staff', label: 'Teacher/Staff' },
    { path: '/parent', label: 'Parent/Guardian' },
    { path: '/student', label: 'Student' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--line-soft)] bg-[#102733]/95 text-[#f2ead8] backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-11 h-11 rounded-2xl bg-[#f2ead8] text-[#123547] flex items-center justify-center font-extrabold tracking-tight shadow-md">
              IS
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Islamiyya School</h1>
              <p className="text-[11px] text-[#d7ccb4] uppercase tracking-[0.2em]">Learning System</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4 rounded-2xl bg-[#1b3a4c] px-4 py-2 border border-[#446070]">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                    <p className="text-[11px] text-[#d6cab4] capitalize tracking-wide">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#f2ead8] rounded-full flex items-center justify-center text-[#123547] font-bold">
                    {user.name.charAt(0)}
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg border border-[#446070]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <button
                  onClick={handleLogout}
                  className="hidden md:block rounded-xl bg-[#9f3f31] hover:bg-[#873528] px-5 py-2.5 font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="relative group">
                <button className="rounded-xl bg-[#1f7a63] hover:bg-[#185e4d] px-6 py-2.5 font-semibold transition">
                  Login
                </button>
                <div className="absolute right-0 mt-2 w-60 rounded-2xl p-2 bg-white text-[#203847] border border-[#d9d0be] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {roleLinks.map((item) => (
                    <Link key={item.path} to={item.path} className="block px-4 py-3 rounded-xl hover:bg-[#f3eee2]">
                      Login as {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && user && (
          <div className="md:hidden pb-4 border-t border-[#365161]">
            <button
              onClick={handleLogout}
              className="w-full mt-4 rounded-xl bg-[#9f3f31] hover:bg-[#873528] px-4 py-2.5 font-medium transition text-left"
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
