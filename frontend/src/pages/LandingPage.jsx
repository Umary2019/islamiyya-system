import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-14 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Islamiyya School Management System
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-blue-100 mb-3 sm:mb-4">
                A Modern Platform for Qur'anic Education Excellence
              </p>
              <p className="text-sm sm:text-base md:text-lg text-blue-200 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                Monitor student memorization progress, manage staff records, and bridge communication between teachers, students, and parents
              </p>
              <Link
                to="/login"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-10 sm:py-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">100%</div>
                <p className="text-gray-600 font-semibold text-sm sm:text-base">Digital Records</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">4</div>
                <p className="text-gray-600 font-semibold text-sm sm:text-base">User Roles</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">24/7</div>
                <p className="text-gray-600 font-semibold text-sm sm:text-base">Access Available</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">Secure</div>
                <p className="text-gray-600 font-semibold text-sm sm:text-base">Data Protection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-10 sm:mb-16">
              Comprehensive Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Daily Progress Tracking</h3>
                <p className="text-gray-600">
                  Record and monitor students' daily Qur'anic memorization with detailed Surah and Ayah references
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Weekly Summaries</h3>
                <p className="text-gray-600">
                  Comprehensive weekly progress reports showing total pages memorized and performance metrics
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Role-Based System</h3>
                <p className="text-gray-600">
                  Dedicated dashboards for Admin, Teachers, Parents, and Students with role-specific features
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-yellow-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🔐</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Secure Authentication</h3>
                <p className="text-gray-600">
                  JWT-based authentication with encrypted passwords and role-based access control
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-red-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Responsive Design</h3>
                <p className="text-gray-600">
                  Beautiful, modern interface optimized for desktop, tablet, and mobile devices
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="bg-indigo-100 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Easy Management</h3>
                <p className="text-gray-600">
                  Admin tools for staff management, parent-student linking, record approvals, and system analytics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-10 sm:mb-16">User Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Students */}
              <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 md:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-6">👨‍🎓 For Students</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Track personal memorization progress
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    View your assigned teacher and class
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Monitor grades and performance metrics
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Access historical records anytime
                  </li>
                </ul>
              </div>

              {/* Teachers */}
              <div className="border-l-4 border-green-500 pl-4 sm:pl-6 md:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-6">👨‍🏫 For Teachers/Staff</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Record daily student memorization
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Create and submit weekly summaries
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Add remarks and digital signatures
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Track all student progress centrally
                  </li>
                </ul>
              </div>

              {/* Parents */}
              <div className="border-l-4 border-purple-500 pl-4 sm:pl-6 md:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-6">👨‍👩‍👧 For Parents/Guardians</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Monitor child's progress in real-time
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    View weekly summaries and grades
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Communicate with teachers directly
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Receive performance notifications
                  </li>
                </ul>
              </div>

              {/* Admin */}
              <div className="border-l-4 border-red-500 pl-4 sm:pl-6 md:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5 sm:mb-6">👨‍💼 For Administrators</h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Manage users and system settings
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Approve student records
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    Assign teachers to students
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <span className="text-green-500 font-bold text-xl mr-3">✓</span>
                    View comprehensive analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Role Cards Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-10 sm:mb-16">
              Select Your Role
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* Admin Card */}
              <Link to="/admin">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform md:hover:-translate-y-2 cursor-pointer h-full">
                  <div className="bg-blue-500 px-6 py-3 text-white">
                    <div className="text-4xl sm:text-5xl text-center mb-2 sm:mb-4">👨‍💼</div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 text-center">Administrator</h3>
                    <p className="text-gray-600 text-sm text-center mb-5 sm:mb-6 min-h-[40px] sm:min-h-[48px]">
                      Manage system, users, approvals, and view analytics
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition">
                      Login
                    </button>
                  </div>
                </div>
              </Link>

              {/* Staff Card */}
              <Link to="/staff">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform md:hover:-translate-y-2 cursor-pointer h-full">
                  <div className="bg-blue-500 px-6 py-3 text-white">
                    <div className="text-4xl sm:text-5xl text-center mb-2 sm:mb-4">👨‍🏫</div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 text-center">Teacher/Staff</h3>
                    <p className="text-gray-600 text-sm text-center mb-5 sm:mb-6 min-h-[40px] sm:min-h-[48px]">
                      Record progress, create summaries
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition">
                      Login
                    </button>
                  </div>
                </div>
              </Link>

              {/* Parent Card */}
              <Link to="/parent">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform md:hover:-translate-y-2 cursor-pointer h-full">
                  <div className="bg-blue-500 px-6 py-3 text-white">
                    <div className="text-4xl sm:text-5xl text-center mb-2 sm:mb-4">👨‍👩‍👧</div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 text-center">Parent/Guardian</h3>
                    <p className="text-gray-600 text-sm text-center mb-5 sm:mb-6 min-h-[40px] sm:min-h-[48px]">
                      Monitor child's progress
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition">
                      Login
                    </button>
                  </div>
                </div>
              </Link>

              {/* Student Card */}
              <Link to="/student">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform md:hover:-translate-y-2 cursor-pointer h-full">
                  <div className="bg-blue-500 px-6 py-3 text-white">
                    <div className="text-4xl sm:text-5xl text-center mb-2 sm:mb-4">👨‍🎓</div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 text-center">Student</h3>
                    <p className="text-gray-600 text-sm text-center mb-5 sm:mb-6 min-h-[40px] sm:min-h-[48px]">
                      View your progress
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition">
                      Login
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-14 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Sign in to your account to manage, track, or monitor Qur'anic memorization progress
            </p>
            <Link
              to="/login"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition transform hover:scale-105"
            >
              Login Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4">&copy; 2026 Islamiyya School Management System. All rights reserved.</p>
            <p className="text-xs sm:text-sm break-all sm:break-normal">For technical support, please contact: support@islamiyyaschool.edu</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
