import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const defaultApiBaseUrl = isLocalhost ? 'http://localhost:5000/api' : '/_/backend/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || defaultApiBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getProfile: () => api.get('/auth/profile'),
};

export const userAPI = {
  getUsersByRole: (role) => api.get('/users', { params: { role } }),
  getAllStaff: () => api.get('/users/staff'),
  getAllStudents: () => api.get('/users/students'),
  getAllParents: () => api.get('/users/parents'),
  getUser: (id) => api.get(`/users/${id}`),
  getUserById: (id) => api.get(`/users/${id}`),
  assignTeacher: (data) => api.post('/users/assign-teacher', data),
  linkParent: (data) => api.post('/users/link-parent', data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const recordAPI = {
  createRecord: (data) => api.post('/records', data),
  getStaffRecords: () => api.get('/records/staff/records'),
  getStudentRecords: (studentId) => api.get(`/records/student/${studentId}`),
  getAllRecords: () => api.get('/records/all'),
  updateRecord: (id, data) => api.put(`/records/${id}`, data),
  deleteRecord: (id) => api.delete(`/records/${id}`),
  getPendingRecords: () => api.get('/records/pending'),
  approveRecord: (id) => api.put(`/records/approve/${id}`),
};

export const summaryAPI = {
  createSummary: (data) => api.post('/summaries', data),
  getStudentSummaries: (studentId) => api.get(`/summaries/student/${studentId}`),
  getAllSummaries: () => api.get('/summaries'),
  updateSummary: (id, data) => api.put(`/summaries/${id}`, data),
  deleteSummary: (id) => api.delete(`/summaries/${id}`),
};

export default api;