import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { userAPI, recordAPI } from '../utils/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ students: 0, staff: 0, parents: 0 });
  const [staffList, setStaffList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [parentsList, setParentsList] = useState([]);
  const [pendingRecords, setPendingRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkForm, setLinkForm] = useState({ parentId: '', studentId: '' });
  const [assignForm, setAssignForm] = useState({ studentId: '', teacherId: '' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [staffRes, studentsRes, parentsRes, recordsRes] = await Promise.all([
        userAPI.getAllStaff(),
        userAPI.getAllStudents(),
        userAPI.getAllParents(),
        recordAPI.getPendingRecords(),
      ]);

      const allRecordsRes = await recordAPI.getAllRecords();

      setStaffList(staffRes.data.staff);
      setStudentsList(studentsRes.data.students);
      setParentsList(parentsRes.data.parents);
      setPendingRecords(recordsRes.data.records);
      setAllRecords(allRecordsRes.data.records);

      setStats({
        students: studentsRes.data.count,
        staff: staffRes.data.count,
        parents: parentsRes.data.count,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRecord = async (recordId) => {
    try {
      await recordAPI.approveRecord(recordId);
      setPendingRecords(pendingRecords.filter((r) => r._id !== recordId));
      alert('Record approved successfully');
    } catch (error) {
      alert('Error approving record');
    }
  };

  const handleLinkParent = async (e) => {
    e.preventDefault();
    if (!linkForm.parentId || !linkForm.studentId) {
      alert('Please select both parent and student');
      return;
    }

    try {
      await userAPI.linkParent({
        parentId: linkForm.parentId,
        studentId: linkForm.studentId,
      });
      setLinkForm({ parentId: '', studentId: '' });
      fetchDashboardData();
      alert('Parent linked to student successfully');
    } catch (error) {
      alert('Error linking parent');
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();

    if (!assignForm.studentId || !assignForm.teacherId) {
      alert('Please select both student and teacher');
      return;
    }

    try {
      await userAPI.assignTeacher({
        studentId: assignForm.studentId,
        teacherId: assignForm.teacherId,
      });
      setAssignForm({ studentId: '', teacherId: '' });
      fetchDashboardData();
      alert('Teacher assigned successfully');
    } catch (error) {
      alert('Error assigning teacher');
    }
  };

  const navigationItems = [
    { key: 'overview', label: 'Overview', icon: '🏠' },
    { key: 'staff', label: 'Staff', icon: '👨‍🏫' },
    { key: 'students', label: 'Students', icon: '👨‍🎓' },
    { key: 'parents', label: 'Parents', icon: '👨‍👩‍👧' },
    { key: 'student-activity', label: 'Student Activity', icon: '📚' },
    { key: 'pending-records', label: 'Pending Records', icon: '⏳' },
    { key: 'link-parent', label: 'Link Parent', icon: '🔗' },
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle={`Welcome, ${user?.name || 'Admin'}`}
      user={user}
      navigationItems={navigationItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerAccent="blue"
    >
      {/* Stats Cards */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 font-medium mb-2">Total Students</h3>
                    <p className="text-4xl font-bold text-blue-700">{stats.students}</p>
              </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 font-medium mb-2">Total Staff</h3>
                <p className="text-4xl font-bold text-blue-700">{stats.staff}</p>
              </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 font-medium mb-2">Total Parents</h3>
                <p className="text-4xl font-bold text-purple-700">{stats.parents}</p>
              </div>
        </div>
      )}

      {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {loading ? (
              <p className="text-center py-8">Loading...</p>
            ) : activeTab === 'overview' ? (
              <p className="text-gray-600">Select a tab to view details</p>
            ) : activeTab === 'staff' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">All Staff</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffList.map((staff) => (
                        <tr key={staff._id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">{staff.name}</td>
                          <td className="px-4 py-2">{staff.email}</td>
                          <td className="px-4 py-2">{staff.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'students' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">All Students</h2>
                <form
                  onSubmit={handleAssignTeacher}
                  className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <select
                    value={assignForm.studentId}
                    onChange={(e) =>
                      setAssignForm({ ...assignForm, studentId: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Student --</option>
                    {studentsList.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={assignForm.teacherId}
                    onChange={(e) =>
                      setAssignForm({ ...assignForm, teacherId: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Teacher --</option>
                    {staffList.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
                  >
                    Assign Teacher
                  </button>
                </form>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Assigned Teacher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsList.map((student) => (
                        <tr key={student._id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">{student.name}</td>
                          <td className="px-4 py-2">{student.email}</td>
                          <td className="px-4 py-2">
                            {student.teacherId?.name || 'Not assigned'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'parents' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">All Parents</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Linked Student</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parentsList.map((parent) => (
                        <tr key={parent._id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">{parent.name}</td>
                          <td className="px-4 py-2">{parent.email}</td>
                          <td className="px-4 py-2">
                            {parent.studentId?.name || 'Not linked'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'pending-records' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Pending Records</h2>
                <div className="space-y-4">
                  {pendingRecords.length === 0 ? (
                    <p className="text-gray-600">No pending records</p>
                  ) : (
                    pendingRecords.map((record) => (
                      <div key={record._id} className="border border-gray-200 p-4 rounded">
                        <p>
                          <strong>Student:</strong> {record.studentId?.name}
                        </p>
                        <p>
                          <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Surah:</strong> {record.surah} (Ayah {record.ayahFrom} -{' '}
                          {record.ayahTo})
                        </p>
                        <p>
                          <strong>Grade:</strong> {record.grade}
                        </p>
                        <button
                          onClick={() => handleApproveRecord(record._id)}
                          className="mt-3 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                        >
                          Approve
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : activeTab === 'student-activity' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">All Student Activity</h2>
                {allRecords.length === 0 ? (
                  <p className="text-gray-600">No student records found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Student</th>
                          <th className="px-4 py-2 text-left">Teacher</th>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Surah</th>
                          <th className="px-4 py-2 text-left">Ayah</th>
                          <th className="px-4 py-2 text-left">Grade</th>
                          <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allRecords.map((record) => (
                          <tr key={record._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">{record.studentId?.name || 'Unknown'}</td>
                            <td className="px-4 py-2">{record.staffId?.name || 'Unknown'}</td>
                            <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{record.surah}</td>
                            <td className="px-4 py-2">{record.ayahFrom} - {record.ayahTo}</td>
                            <td className="px-4 py-2 font-semibold">{record.grade}</td>
                            <td className="px-4 py-2 capitalize">{record.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : activeTab === 'link-parent' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Link Parent to Student</h2>
                <form onSubmit={handleLinkParent} className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Parent
                    </label>
                    <select
                      value={linkForm.parentId}
                      onChange={(e) =>
                        setLinkForm({ ...linkForm, parentId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">-- Select Parent --</option>
                      {parentsList.map((parent) => (
                        <option key={parent._id} value={parent._id}>
                          {parent.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Student
                    </label>
                    <select
                      value={linkForm.studentId}
                      onChange={(e) =>
                        setLinkForm({ ...linkForm, studentId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">-- Select Student --</option>
                      {studentsList.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
                  >
                    Link Parent
                  </button>
                </form>
              </div>
            ) : null}
          </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
