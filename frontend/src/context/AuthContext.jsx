import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const storeAuthState = (nextToken, nextUser) => {
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const refreshProfile = async (fallbackUser = null) => {
    try {
      const profileRes = await authAPI.getProfile();
      const profileUser = profileRes.data.user;
      localStorage.setItem('user', JSON.stringify(profileUser));
      setUser(profileUser);
      return profileUser;
    } catch (error) {
      if (fallbackUser) {
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        setUser(fallbackUser);
      }
      return fallbackUser;
    }
  };

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Keep user linkage fields current after app reload.
      refreshProfile(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: baseUser } = response.data;

      storeAuthState(token, baseUser);
      const profileUser = await refreshProfile(baseUser);

      return { success: true, user: profileUser || baseUser };
    } catch (error) {
      const apiMessage = error.response?.data?.message || error.response?.data?.error;
      return {
        success: false,
        error: apiMessage || error.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, phone, password, role) => {
    try {
      const response = await authAPI.register({
        name,
        email,
        phone,
        password,
        role,
      });
      const { token, user: baseUser } = response.data;

      storeAuthState(token, baseUser);
      const profileUser = await refreshProfile(baseUser);

      return { success: true, user: profileUser || baseUser };
    } catch (error) {
      const apiMessage = error.response?.data?.message || error.response?.data?.error;
      return {
        success: false,
        error: apiMessage || error.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
