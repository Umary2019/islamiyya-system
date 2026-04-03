const express = require('express');
const {
  createStudentRecord,
  getStudentRecords,
  getStaffRecords,
  updateStudentRecord,
  deleteStudentRecord,
  approveRecord,
  getPendingRecords,
  getAllRecords,
} = require('../controllers/recordController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Staff/Teacher routes
router.post('/', authenticateToken, authorizeRole('staff'), createStudentRecord);
router.get('/staff/records', authenticateToken, authorizeRole('staff'), getStaffRecords);
router.get('/student/:studentId', authenticateToken, getStudentRecords);
router.put('/:id', authenticateToken, updateStudentRecord);
router.delete('/:id', authenticateToken, deleteStudentRecord);

// Admin routes
router.get('/pending', authenticateToken, authorizeRole('admin'), getPendingRecords);
router.get('/all', authenticateToken, authorizeRole('admin'), getAllRecords);
router.put('/approve/:id', authenticateToken, authorizeRole('admin'), approveRecord);

module.exports = router;
