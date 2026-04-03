import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LoginRegisterPage = ({ role, roleDisplay }) => {
  const isAdmin = role === 'admin';
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isAdmin && !isLogin) {
        setError('Admin account creation is disabled');
        setLoading(false);
        return;
      }

      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          setLoading(false);
          return;
        }

        const result = await login(formData.email, formData.password);
        if (result.success) {
          if (result.user.role === role) {
            navigate(`/${role}/dashboard`);
          } else {
            setError(`This account is for ${result.user.role}, not ${roleDisplay}`);
          }
        } else {
          setError(result.error);
        }
      } else {
        if (
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError('All fields are required');
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await register(
          formData.name,
          formData.email,
          formData.phone,
          formData.password,
          role
        );

        if (result.success) {
          navigate(`/${role}/dashboard`);
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = () => {
    const colors = {
      admin: 'from-blue-600 to-blue-700',
      staff: 'from-green-600 to-green-700',
      parent: 'from-purple-600 to-purple-700',
      student: 'from-yellow-600 to-yellow-700',
    };
    return colors[role] || 'from-gray-600 to-gray-700';
  };

  const getRoleIcon = () => {
    const icons = {
      admin: '👨‍💼',
      staff: '👨‍🏫',
      parent: '👨‍👩‍👧',
      student: '👨‍🎓',
    };
    return icons[role] || '👤';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Info */}
            <div className={`bg-gradient-to-br ${getRoleColor()} text-white rounded-lg p-8 flex flex-col justify-center hidden md:flex`}>
              <div className="text-6xl mb-6">{getRoleIcon()}</div>
              <h2 className="text-4xl font-bold mb-4">{roleDisplay}</h2>
              <p className="text-lg text-opacity-90 mb-6">
                {role === 'admin' && 'Manage the system, approve records, and view analytics'}
                {role === 'staff' && 'Record student progress and create weekly summaries'}
                {role === 'parent' && 'Monitor your child\'s memorization progress'}
                {role === 'student' && 'Track your memorization journey and view your records'}
              </p>
              <div className="space-y-3 text-sm text-opacity-80">
                <p className="flex items-center">
                  <span className="mr-3">✓</span>
                  Secure access with encrypted data
                </p>
                <p className="flex items-center">
                  <span className="mr-3">✓</span>
                  Real-time progress tracking
                </p>
                <p className="flex items-center">
                  <span className="mr-3">✓</span>
                  Easy to use interface
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600">
                  {isAdmin
                    ? 'Sign in with administrator credentials'
                    : isLogin
                    ? 'Sign in to your account'
                    : `Register as ${roleDisplay}`}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold text-sm">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && !isAdmin && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a strong password"
                  />
                  {!isLogin && (
                    <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                  )}
                </div>

                {!isLogin && !isAdmin && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold text-white transition mt-6 ${getRoleColor().replace('from-', 'bg-').replace(' to-', ' ')} hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⏳</span>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : isLogin ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {!isAdmin && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  </p>
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm"
                  >
                    {isLogin ? 'Create one now' : 'Sign in instead'}
                  </button>
                </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center justify-center">
                  <span className="mr-2">←</span>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegisterPage;
