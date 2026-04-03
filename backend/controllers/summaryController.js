const WeeklySummary = require('../models/WeeklySummary');
const StudentRecord = require('../models/StudentRecord');

// Create or update weekly summary
exports.createWeeklySummary = async (req, res) => {
  try {
    const {
      studentId,
      week,
      year,
      startDate,
      endDate,
      surahFrom,
      ayahFromStart,
      surahTo,
      ayahToEnd,
      totalPages,
    } = req.body;

    // Validate required fields
    if (!studentId || !week || !year || !surahFrom || !ayahFromStart || !surahTo || !ayahToEnd || !totalPages) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if summary already exists
    const existingSummary = await WeeklySummary.findOne({
      studentId,
      week,
      year,
    });

    if (existingSummary) {
      return res.status(400).json({ message: 'Weekly summary already exists for this week' });
    }

    // Get records for the week to calculate average grade
    const records = await StudentRecord.find({
      studentId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    // Calculate average grade (simple approach: count grades)
    let averageGrade = 'N/A';
    if (records.length > 0) {
      const gradeMap = { 'A+': 4.0, A: 3.9, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, D: 1.0, F: 0.0 };
      const avgValue = records.reduce((sum, rec) => sum + (gradeMap[rec.grade] || 0), 0) / records.length;
      
      // Convert back to letter grade
      if (avgValue >= 3.9) averageGrade = 'A';
      else if (avgValue >= 3.3) averageGrade = 'A-';
      else if (avgValue >= 3.0) averageGrade = 'B+';
      else if (avgValue >= 2.7) averageGrade = 'B';
      else if (avgValue >= 2.3) averageGrade = 'B-';
      else if (avgValue >= 2.0) averageGrade = 'C+';
      else if (avgValue >= 1.7) averageGrade = 'C';
      else if (avgValue >= 1.0) averageGrade = 'D';
      else averageGrade = 'F';
    }

    const newSummary = new WeeklySummary({
      studentId,
      week,
      year,
      startDate,
      endDate,
      surahFrom,
      ayahFromStart,
      surahTo,
      ayahToEnd,
      totalPages,
      averageGrade,
      recordIds: records.map(r => r._id),
    });

    await newSummary.save();
    await newSummary.populate('studentId', 'name email');

    res.status(201).json({
      message: 'Weekly summary created successfully',
      summary: newSummary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get weekly summary for a student
exports.getStudentWeeklySummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { week, year } = req.query;

    let query = { studentId };
    if (week) query.week = parseInt(week);
    if (year) query.year = parseInt(year);

    const summaries = await WeeklySummary.find(query)
      .populate('studentId', 'name email')
      .populate('recordIds')
      .sort({ year: -1, week: -1 });

    res.status(200).json({
      count: summaries.length,
      summaries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all weekly summaries (Admin)
exports.getAllWeeklySummaries = async (req, res) => {
  try {
    const summaries = await WeeklySummary.find()
      .populate('studentId', 'name email')
      .populate('recordIds')
      .sort({ year: -1, week: -1 });

    res.status(200).json({
      count: summaries.length,
      summaries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update weekly summary
exports.updateWeeklySummary = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      surahFrom,
      ayahFromStart,
      surahTo,
      ayahToEnd,
      totalPages,
    } = req.body;

    const summary = await WeeklySummary.findById(id);

    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }

    // Update fields
    if (surahFrom) summary.surahFrom = surahFrom;
    if (ayahFromStart !== undefined) summary.ayahFromStart = ayahFromStart;
    if (surahTo) summary.surahTo = surahTo;
    if (ayahToEnd !== undefined) summary.ayahToEnd = ayahToEnd;
    if (totalPages !== undefined) summary.totalPages = totalPages;

    await summary.save();
    await summary.populate('studentId', 'name email');

    res.status(200).json({
      message: 'Summary updated successfully',
      summary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete weekly summary
exports.deleteWeeklySummary = async (req, res) => {
  try {
    const { id } = req.params;

    const summary = await WeeklySummary.findByIdAndDelete(id);

    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }

    res.status(200).json({ message: 'Summary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
