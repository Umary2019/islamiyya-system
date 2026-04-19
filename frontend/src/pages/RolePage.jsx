import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RolePage = ({ role, roleDisplay, description }) => {
  const navigate = useNavigate();

  if (!role) {
    const roles = [
      { key: 'admin', icon: '👨‍💼', label: 'Administrator', description: 'System management and approvals' },
      { key: 'staff', icon: '👨‍🏫', label: 'Teacher/Staff', description: 'Record and manage memorization' },
      { key: 'parent', icon: '👨‍👩‍👧', label: 'Parent/Guardian', description: "Track your child's progress" },
      { key: 'student', icon: '👨‍🎓', label: 'Student', description: 'View your records and performance' },
    ];

    return (
      <>
        <Navbar />
        <div className="min-h-screen mesh-bg py-12 px-4 fade-rise">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel rounded-3xl p-8 mb-6 text-center">
              <h1 className="text-4xl font-bold text-[color:var(--ink-900)] mb-2">Select Login Role</h1>
              <p className="text-[color:var(--ink-500)]">Choose the account type you want to use</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((item) => (
                <Link key={item.key} to={`/${item.key}`}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition duration-200 cursor-pointer h-full border border-[#ddd2bf] card-lift">
                    <p className="text-4xl mb-4">{item.icon}</p>
                    <h2 className="text-xl font-bold text-[color:var(--ink-900)] mb-2">{item.label}</h2>
                    <p className="text-[color:var(--ink-500)]">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mesh-bg py-12 px-4 fade-rise">
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[color:var(--ink-900)] mb-4">{roleDisplay}</h1>
            <p className="text-[color:var(--ink-500)] text-lg">{description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate(`/${role}-login-register`)}
              className="w-full py-3.5 rounded-xl bg-[#1f7a63] hover:bg-[#185e4d] text-[#f8f2e8] font-bold text-lg shadow-lg shadow-[#1f7a63]/25 transition"
            >
              Login
            </button>

            {role !== 'admin' && (
              <button
                onClick={() => navigate(`/${role}-register`)}
                className="w-full py-3.5 rounded-xl bg-[#102733] hover:bg-[#0c1f28] text-[#f4e9ce] font-bold text-lg shadow-lg shadow-[#102733]/25 transition"
              >
                Register
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl border border-[#d3c7b2] text-[color:var(--ink-700)] hover:bg-[#f4eee1] font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePage;
