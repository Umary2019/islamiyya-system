import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RolePage = ({ role, roleDisplay, description }) => {
  const navigate = useNavigate();

  if (!role) {
    const roles = [
      { key: 'admin', label: 'Administrator', description: 'System management and approvals' },
      { key: 'staff', label: 'Teacher/Staff', description: 'Record and manage memorization' },
      { key: 'parent', label: 'Parent/Guardian', description: "Track your child's progress" },
      { key: 'student', label: 'Student', description: 'View your records and performance' },
    ];

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">Select Login Role</h1>
              <p className="text-gray-600 text-center">Choose the account type you want to log in with</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((item) => (
                <Link key={item.key} to={`/${item.key}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition duration-200 cursor-pointer h-full border border-gray-100">
                    <h2 className="text-xl font-bold text-blue-700 mb-2">{item.label}</h2>
                    <p className="text-gray-600">{item.description}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">{roleDisplay}</h1>
            <p className="text-gray-600 text-lg">{description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate(`/${role}-login-register`, { state: { isLogin: true } })}
              className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 font-medium text-lg"
            >
              Login
            </button>

            {role !== 'admin' && (
              <button
                onClick={() => navigate(`/${role}-login-register`, { state: { isLogin: false } })}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-medium text-lg"
              >
                Register
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 font-medium"
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
