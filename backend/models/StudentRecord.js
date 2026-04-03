const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    surah: {
      type: String,
      required: true,
    },
    ayahFrom: {
      type: Number,
      required: true,
    },
    ayahTo: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
      required: true,
    },
    taskTitle: {
      type: String,
      default: '',
      trim: true,
    },
    taskDetails: {
      type: String,
      default: '',
      trim: true,
    },
    remarks: {
      type: String,
      default: '',
    },
    signature: {
      type: String,
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentRecord', studentRecordSchema);
