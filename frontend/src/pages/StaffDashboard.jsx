import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { recordAPI, userAPI } from '../utils/api';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('create-record');
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    surah: '',
    ayahFrom: '',
    ayahTo: '',
    grade: 'A',
    taskTitle: '',
    taskDetails: '',
    remarks: '',
  });

  useEffect(() => {
    if (activeTab === 'my-records') {
      fetchRecords();
    } else if (activeTab === 'create-record') {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAllStudents();
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await recordAPI.getStaffRecords();
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentId ||
      !formData.date ||
      !formData.surah ||
      !formData.ayahFrom ||
      !formData.ayahTo ||
      !formData.taskTitle
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await recordAPI.createRecord({
        studentId: formData.studentId,
        date: formData.date,
        surah: formData.surah,
        ayahFrom: parseInt(formData.ayahFrom),
        ayahTo: parseInt(formData.ayahTo),
        grade: formData.grade,
        taskTitle: formData.taskTitle,
        taskDetails: formData.taskDetails,
        remarks: formData.remarks,
      });

      setFormData({
        studentId: '',
        date: '',
        surah: '',
        ayahFrom: '',
        ayahTo: '',
        grade: 'A',
        taskTitle: '',
        taskDetails: '',
        remarks: '',
      });

      setSuccessMessage('Record created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      fetchRecords();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      alert('Error creating record: ' + errorMessage);
    }
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-green-100 text-green-800',
      'A-': 'bg-green-50 text-green-700',
      'B+': 'bg-blue-100 text-blue-800',
      'B': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-50 text-blue-700',
      'C+': 'bg-yellow-100 text-yellow-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'C-': 'bg-yellow-50 text-yellow-700',
      'D': 'bg-orange-100 text-orange-800',
      'F': 'bg-red-100 text-red-800',
    };
    return gradeColors[grade] || 'bg-gray-100 text-gray-800';
  };

  const navigationItems = [
    { key: 'create-record', label: 'Record Memorization', icon: '➕' },
    { key: 'my-records', label: 'My Records', icon: '📋' },
  ];

  return (
    <DashboardLayout
      title="Teacher/Staff Dashboard"
      subtitle={`Welcome, ${user?.name || 'Teacher'}`}
      user={user}
      navigationItems={navigationItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerAccent="blue"
    >
      {/* Create Record Section */}
      {activeTab === 'create-record' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Record Student's Memorization</h2>

              {successMessage && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-semibold">
                  ✓ {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Select Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Surah */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Surah Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="surah"
                      value={formData.surah}
                      onChange={handleChange}
                      placeholder="e.g., Al-Fatiha"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Grade <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>A+</option>
                      <option>A</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>B-</option>
                      <option>C+</option>
                      <option>C</option>
                      <option>C-</option>
                      <option>D</option>
                      <option>F</option>
                    </select>
                  </div>

                  {/* Ayah From */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Starting Ayah <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="ayahFrom"
                      value={formData.ayahFrom}
                      onChange={handleChange}
                      placeholder="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Ayah To */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Ending Ayah <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="ayahTo"
                      value={formData.ayahTo}
                      onChange={handleChange}
                      placeholder="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Remarks */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Assigned Task <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="taskTitle"
                      value={formData.taskTitle}
                      onChange={handleChange}
                      placeholder="e.g., Revise Surah Al-Baqarah Ayah 1-10 before next class"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Task Details
                    </label>
                    <textarea
                      name="taskDetails"
                      value={formData.taskDetails}
                      onChange={handleChange}
                      placeholder="Add instructions, due focus, pronunciation targets, or repetition count..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Remarks & Notes
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Add any additional notes or observations..."
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
                  >
                    Submit Record
                  </button>
                </div>
          </form>
        </div>
      )}

      {/* My Records Section */}
      {activeTab === 'my-records' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">My Student Records</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading your records...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No records created yet</p>
              <button
                onClick={() => setActiveTab('create-record')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Create Your First Record
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Student</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Surah</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Ayah Range</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Assigned Task</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Grade</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{record.studentId?.name}</p>
                        <p className="text-sm text-gray-500">{record.studentId?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 font-semibold">{record.surah}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{record.ayahFrom} - {record.ayahTo}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 font-medium">{record.taskTitle || 'No task set'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(record.grade)}`}>
                          {record.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          record.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : record.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default StaffDashboard;
