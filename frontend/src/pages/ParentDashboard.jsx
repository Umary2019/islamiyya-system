import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { recordAPI, summaryAPI, userAPI } from '../utils/api';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('child-records');
  const [child, setChild] = useState(null);
  const [records, setRecords] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [performanceAlerts, setPerformanceAlerts] = useState([]);

  const linkedStudentId =
    typeof user?.studentId === 'object' ? user?.studentId?._id : user?.studentId;

  useEffect(() => {
    if (linkedStudentId) {
      loadChildInfo();
    }
  }, [linkedStudentId]);

  useEffect(() => {
    if (child?._id) {
      if (activeTab === 'child-records') {
        fetchChildRecords();
      } else if (activeTab === 'summary') {
        fetchChildSummaries();
      } else if (activeTab === 'alerts') {
        generateAlerts();
      }
    }
  }, [activeTab, child]);

  const loadChildInfo = async () => {
    if (!linkedStudentId) return;

    try {
      const response = await userAPI.getUserById(linkedStudentId);
      setChild(response.data.user);
      fetchChildRecords();
    } catch (error) {
      console.error('Error loading child info:', error);
    }
  };

  const fetchChildRecords = async () => {
    if (!linkedStudentId) return;

    setLoading(true);
    try {
      const response = await recordAPI.getStudentRecords(linkedStudentId);
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildSummaries = async () => {
    if (!linkedStudentId) return;

    setLoading(true);
    try {
      const response = await summaryAPI.getStudentSummaries(linkedStudentId);
      setSummaries(response.data.summaries);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAlerts = () => {
    const alerts = [];

    if (records.length > 0) {
      const recentRecords = records.slice(0, 5);
      const failedCount = recentRecords.filter((r) => r.grade === 'F').length;

      if (failedCount > 2) {
        alerts.push({
          type: 'critical',
          message: `⚠️ Critical: ${failedCount} failed assessments in recent records`,
        });
      }

      const averageGrade =
        recentRecords.reduce((sum, r) => {
          const gradeMap = {
            'A+': 4.0,
            A: 3.9,
            'A-': 3.7,
            'B+': 3.3,
            B: 3.0,
            'B-': 2.7,
            'C+': 2.3,
            C: 2.0,
            'C-': 1.7,
            D: 1.0,
            F: 0.0,
          };
          return sum + (gradeMap[r.grade] || 0);
        }, 0) / recentRecords.length;

      if (averageGrade < 2.0) {
        alerts.push({
          type: 'warning',
          message: `⚠️ Warning: Average grade is ${averageGrade.toFixed(2)}. Consider extra support.`,
        });
      }
    }

    if (alerts.length === 0) {
      alerts.push({
        type: 'success',
        message: '✅ Great! Your child is performing well.',
      });
    }

    setPerformanceAlerts(alerts);
  };

  const navigationItems = [
    { key: 'child-records', label: "Child's Records", icon: '📋' },
    { key: 'summary', label: 'Weekly Summaries', icon: '📊' },
    { key: 'alerts', label: 'Performance Alerts', icon: '⚠️' },
  ];

  return (
    <DashboardLayout
      title="Parent/Guardian Dashboard"
      subtitle={child ? `Monitoring: ${child.name}` : 'Track your child\'s progress'}
      user={user}
      navigationItems={navigationItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerAccent="purple"
    >
      {/* Stats */}
      {child && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <h3 className="text-gray-600 font-medium mb-2">Total Records</h3>
                <p className="text-4xl font-bold text-blue-700">{records.length}</p>
              </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <h3 className="text-gray-600 font-medium mb-2">Assigned Teacher</h3>
                <p className="text-lg font-bold text-blue-700">{child.teacherId?.name || 'N/A'}</p>
              </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <h3 className="text-gray-600 font-medium mb-2">Latest Grade</h3>
                <p className="text-4xl font-bold text-purple-700">
                  {records.length > 0 ? records[0].grade : 'N/A'}
                </p>
              </div>
            </div>
        )}

      {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!child ? (
              <p className="text-gray-600">No child linked to this account</p>
            ) : loading ? (
              <p className="text-center py-8">Loading...</p>
            ) : activeTab === 'child-records' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  {child.name}'s Daily Records
                </h2>
                {records.length === 0 ? (
                  <p className="text-gray-600">No records yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Surah</th>
                          <th className="px-4 py-2 text-left">Ayah Range</th>
                          <th className="px-4 py-2 text-left">Grade</th>
                          <th className="px-4 py-2 text-left">Teacher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record) => (
                          <tr key={record._id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">{record.surah}</td>
                            <td className="px-4 py-2">
                              {record.ayahFrom} - {record.ayahTo}
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`font-bold px-2 py-1 rounded ${
                                  record.grade === 'F'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {record.grade}
                              </span>
                            </td>
                            <td className="px-4 py-2">{record.staffId?.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : activeTab === 'summary' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Weekly Summaries</h2>
                {summaries.length === 0 ? (
                  <p className="text-gray-600">No weekly summaries yet</p>
                ) : (
                  <div className="space-y-4">
                    {summaries.map((summary) => (
                      <div key={summary._id} className="border border-gray-200 p-4 rounded">
                        <p className="font-bold text-lg mb-2">
                          Week {summary.week}, {summary.year}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Date Range</p>
                            <p>
                              {new Date(summary.startDate).toLocaleDateString()} -{' '}
                              {new Date(summary.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Memorized</p>
                            <p>
                              {summary.surahFrom}:{summary.ayahFromStart} →{' '}
                              {summary.surahTo}:{summary.ayahToEnd}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Pages</p>
                            <p className="font-bold">{summary.totalPages}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Average Grade</p>
                            <p className="font-bold">{summary.averageGrade}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'alerts' ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Performance Alerts</h2>
                <div className="space-y-4">
                  {performanceAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded ${
                        alert.type === 'critical'
                          ? 'bg-red-100 border border-red-300'
                          : alert.type === 'warning'
                          ? 'bg-yellow-100 border border-yellow-300'
                          : 'bg-green-100 border border-green-300'
                      }`}
                    >
                      <p className="font-medium">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
