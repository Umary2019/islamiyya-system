import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import RolePage from './pages/RolePage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';

// Styles
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<RolePage />} />

          {/* Role Pages */}
          <Route
            path="/admin"
            element={
              <RolePage
                role="admin"
                roleDisplay="Admin"
                description="Manage the entire school system, approve records, and view analytics"
              />
            }
          />
          <Route
            path="/staff"
            element={
              <RolePage
                role="staff"
                roleDisplay="Staff/Teacher"
                description="Record student memorization progress and create weekly summaries"
              />
            }
          />
          <Route
            path="/student"
            element={
              <RolePage
                role="student"
                roleDisplay="Student"
                description="View your daily records, weekly summaries, and performance"
              />
            }
          />
          <Route
            path="/parent"
            element={
              <RolePage
                role="parent"
                roleDisplay="Parent/Guardian"
                description="Monitor your child's progress and receive performance alerts"
              />
            }
          />

          {/* Login/Register Pages */}
          <Route
            path="/admin-login-register"
            element={<LoginRegisterPage role="admin" roleDisplay="Admin" />}
          />
          <Route
            path="/staff-login-register"
            element={<LoginRegisterPage role="staff" roleDisplay="Staff/Teacher" />}
          />
          <Route
            path="/student-login-register"
            element={<LoginRegisterPage role="student" roleDisplay="Student" />}
          />
          <Route
            path="/parent-login-register"
            element={<LoginRegisterPage role="parent" roleDisplay="Parent/Guardian" />}
          />

          {/* Protected Dashboards */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/dashboard"
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
