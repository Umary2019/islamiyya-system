const mongoose = require('mongoose');

const weeklySummarySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    week: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    surahFrom: {
      type: String,
      required: true,
    },
    ayahFromStart: {
      type: Number,
      required: true,
    },
    surahTo: {
      type: String,
      required: true,
    },
    ayahToEnd: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    averageGrade: {
      type: String,
      default: 'N/A',
    },
    recordIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentRecord',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WeeklySummary', weeklySummarySchema);
