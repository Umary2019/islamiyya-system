const mongoose = require('mongoose');
const StudentRecord = require('../models/StudentRecord');
const User = require('../models/User');

// Create a new student record (Staff/Teacher)
exports.createStudentRecord = async (req, res) => {
  try {
    const { studentId, date, surah, ayahFrom, ayahTo, grade, taskTitle, taskDetails, remarks, signature } =
      req.body;

    // Validate required fields
    if (!studentId || !date || !surah || !ayahFrom || !ayahTo || !grade || !taskTitle) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate studentId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID format. Please select a valid student.' });
    }

    // Check if student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found or invalid student ID.' });
    }

    // Validate date
    const recordDate = new Date(date);
    if (isNaN(recordDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const newRecord = new StudentRecord({
      studentId,
      staffId: req.user.id,
      date: recordDate,
      surah,
      ayahFrom: parseInt(ayahFrom),
      ayahTo: parseInt(ayahTo),
      grade,
      taskTitle,
      taskDetails: taskDetails || '',
      remarks,
      signature: signature || req.user.name, // Use staff name if no signature provided
    });

    await newRecord.save();

    // Populate references
    await newRecord.populate('studentId', 'name email');
    await newRecord.populate('staffId', 'name email');

    res.status(201).json({
      message: 'Student record created successfully',
      record: newRecord,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all records for a student
exports.getStudentRecords = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    if (req.user.role === 'student' && req.user.id !== studentId) {
      return res.status(403).json({ message: 'Not authorized to view these records' });
    }

    let query = { studentId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await StudentRecord.find(query)
      .populate('studentId', 'name email')
      .populate('staffId', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all records for staff (created by them)
exports.getStaffRecords = async (req, res) => {
  try {
    const records = await StudentRecord.find({ staffId: req.user.id })
      .populate('studentId', 'name email')
      .populate('staffId', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a record
exports.updateStudentRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, surah, ayahFrom, ayahTo, grade, taskTitle, taskDetails, remarks, signature } = req.body;

    const record = await StudentRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Check authorization
    if (record.staffId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    // Update fields
    if (date) record.date = date;
    if (surah) record.surah = surah;
    if (ayahFrom !== undefined) record.ayahFrom = ayahFrom;
    if (ayahTo !== undefined) record.ayahTo = ayahTo;
    if (grade) record.grade = grade;
    if (taskTitle !== undefined) record.taskTitle = taskTitle;
    if (taskDetails !== undefined) record.taskDetails = taskDetails;
    if (remarks !== undefined) record.remarks = remarks;
    if (signature) record.signature = signature;

    await record.save();

    await record.populate('studentId', 'name email');
    await record.populate('staffId', 'name email');

    res.status(200).json({
      message: 'Record updated successfully',
      record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a record
exports.deleteStudentRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await StudentRecord.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Check authorization
    if (record.staffId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this record' });
    }

    await StudentRecord.findByIdAndDelete(id);

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a record (Admin only)
exports.approveRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await StudentRecord.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    )
      .populate('studentId', 'name email')
      .populate('staffId', 'name email');

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      message: 'Record approved successfully',
      record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pending records (Admin)
exports.getPendingRecords = async (req, res) => {
  try {
    const records = await StudentRecord.find({ status: 'pending' })
      .populate('studentId', 'name email')
      .populate('staffId', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all records (Admin)
exports.getAllRecords = async (req, res) => {
  try {
    const records = await StudentRecord.find({})
      .populate('studentId', 'name email')
      .populate('staffId', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
