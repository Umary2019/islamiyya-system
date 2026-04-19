import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { recordAPI, summaryAPI } from '../utils/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const studentId = user?.id || user?._id;
  const [activeTab, setActiveTab] = useState('daily-records');
  const [records, setRecords] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentId) return;

    if (activeTab === 'daily-records' || activeTab === 'performance') {
      fetchRecords();
    }

    if (activeTab === 'weekly-summary') {
      fetchSummaries();
    }
  }, [activeTab, studentId]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await recordAPI.getStudentRecords(studentId);
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const response = await summaryAPI.getStudentSummaries(studentId);
      setSummaries(response.data.summaries);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRecords = records.length;
  const failedCount = records.filter((record) => record.grade === 'F').length;
  const successRate = records.length > 0 ? (((records.length - failedCount) / records.length) * 100).toFixed(1) : '0.0';
  const averageGrade = records.length > 0
    ? (records.reduce((sum, record) => {
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
        return sum + (gradeMap[record.grade] || 0);
      }, 0) / records.length).toFixed(1)
    : '0.0';

  const getPerformanceColor = () => {
    const rate = parseFloat(successRate);
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-blue-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800',
      A: 'bg-green-100 text-green-800',
      'A-': 'bg-green-50 text-green-700',
      'B+': 'bg-blue-100 text-blue-800',
      B: 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-50 text-blue-700',
      'C+': 'bg-yellow-100 text-yellow-800',
      C: 'bg-yellow-100 text-yellow-800',
      'C-': 'bg-yellow-50 text-yellow-700',
      D: 'bg-orange-100 text-orange-800',
      F: 'bg-red-100 text-red-800',
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  const navigationItems = [
    { key: 'daily-records', label: 'Daily Records', icon: '📝' },
    { key: 'weekly-summary', label: 'Weekly Summary', icon: '📊' },
    { key: 'performance', label: 'Performance', icon: '📈' },
  ];

  return (
    <DashboardLayout
      title="Student Dashboard"
      subtitle={`Welcome, ${user?.name || 'Student'}`}
      user={user}
      navigationItems={navigationItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerAccent="blue"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass-panel rounded-2xl p-6 border border-[#d7ccb8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[color:var(--ink-500)] text-sm font-semibold mb-2">Total Records</p>
              <p className="text-4xl font-bold text-[color:var(--ink-900)]">{totalRecords}</p>
            </div>
            <div className="text-5xl opacity-20">📋</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-[#d7ccb8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[color:var(--ink-500)] text-sm font-semibold mb-2">Success Rate</p>
              <p className={`text-4xl font-bold ${getPerformanceColor()}`}>{successRate}%</p>
            </div>
            <div className="text-5xl opacity-20">✅</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-[#d7ccb8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[color:var(--ink-500)] text-sm font-semibold mb-2">Average Grade</p>
              <p className="text-4xl font-bold text-[color:var(--ink-900)]">{averageGrade}</p>
            </div>
            <div className="text-5xl opacity-20">🎯</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-[#d7ccb8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[color:var(--ink-500)] text-sm font-semibold mb-2">Summaries</p>
              <p className="text-4xl font-bold text-[color:var(--ink-900)]">{summaries.length}</p>
            </div>
            <div className="text-5xl opacity-20">📊</div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 border border-[#d7ccb8]">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : activeTab === 'daily-records' ? (
          <div>
            <h2 className="text-3xl font-bold text-[color:var(--ink-900)] mb-8">Daily Recitation Records</h2>
            {records.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No records yet</p>
                <p className="text-gray-500 text-sm mt-2">Your teacher will record your memorization sessions here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f0eadc] border-b-2 border-[#ded3be]">
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Surah</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Ayah Range</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Assigned Task</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Grade</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Teacher</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record._id} className="border-b border-[#ece3d0] hover:bg-[#f8f4ea] transition">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{record.surah}</td>
                        <td className="px-6 py-4 text-gray-700">{record.ayahFrom} - {record.ayahTo}</td>
                        <td className="px-6 py-4 text-gray-700">
                          <p className="font-semibold text-gray-900">{record.taskTitle || 'No task assigned'}</p>
                          {record.taskDetails && (
                            <p className="text-xs text-gray-500 mt-1">{record.taskDetails}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(record.grade)}`}>
                            {record.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{record.staffId?.name || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
        ) : activeTab === 'weekly-summary' ? (
          <div>
            <h2 className="text-3xl font-bold text-[color:var(--ink-900)] mb-8">Weekly Summaries</h2>
            {summaries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No weekly summaries yet</p>
                <p className="text-gray-500 text-sm mt-2">Your summaries will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {summaries.map((summary) => (
                  <div key={summary._id} className="border border-[#dbd1bf] bg-white/80 p-6 rounded-2xl hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-[color:var(--ink-900)]">Week {summary.week}, {summary.year}</h3>
                      <span className="text-sm bg-[#e5f3ee] text-[#1f7a63] px-3 py-1 rounded-full font-semibold">Submitted</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-semibold">Memorized Range:</p>
                        <p className="text-gray-900 font-bold">{summary.surahFrom}:{summary.ayahFromStart} → {summary.surahTo}:{summary.ayahToEnd}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-semibold">Total Pages:</p>
                        <p className="text-2xl font-bold text-[color:var(--ink-900)]">{summary.totalPages}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <p className="text-gray-600 font-semibold">Average Grade:</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(summary.averageGrade)}`}>
                          {summary.averageGrade}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'performance' ? (
          <div>
            <h2 className="text-3xl font-bold text-[color:var(--ink-900)] mb-8">Performance Analysis</h2>
            {records.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No performance data yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#f8f2e7] to-[#efe6d4] p-8 rounded-2xl border border-[#d9cfbb]">
                  <p className="text-[color:var(--ink-700)] font-semibold text-sm mb-2">Success Rate</p>
                  <p className={`text-5xl font-bold ${getPerformanceColor()}`}>{successRate}%</p>
                  <p className="text-gray-600 text-xs mt-4">
                    {totalRecords - failedCount} of {totalRecords} assessments passed
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#f8f2e7] to-[#efe6d4] p-8 rounded-2xl border border-[#d9cfbb]">
                  <p className="text-[color:var(--ink-700)] font-semibold text-sm mb-2">Average Grade</p>
                  <p className="text-5xl font-bold text-[color:var(--ink-900)]">{averageGrade}</p>
                  <p className="text-gray-600 text-xs mt-4">Based on {totalRecords} records</p>
                </div>

                <div className="bg-gradient-to-br from-[#f8f2e7] to-[#efe6d4] p-8 rounded-2xl border border-[#d9cfbb]">
                  <p className="text-[color:var(--ink-700)] font-semibold text-sm mb-2">Need Improvement</p>
                  <p className="text-5xl font-bold text-[color:var(--ink-900)]">{failedCount}</p>
                  <p className="text-gray-600 text-xs mt-4">Assessments with grade F</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
