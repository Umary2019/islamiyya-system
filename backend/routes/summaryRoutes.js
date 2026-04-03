const express = require('express');
const {
  createWeeklySummary,
  getStudentWeeklySummary,
  getAllWeeklySummaries,
  updateWeeklySummary,
  deleteWeeklySummary,
} = require('../controllers/summaryController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('staff', 'admin'), createWeeklySummary);
router.get('/student/:studentId', authenticateToken, getStudentWeeklySummary);
router.get('/', authenticateToken, authorizeRole('admin'), getAllWeeklySummaries);
router.put('/:id', authenticateToken, authorizeRole('staff', 'admin'), updateWeeklySummary);
router.delete('/:id', authenticateToken, authorizeRole('staff', 'admin'), deleteWeeklySummary);

module.exports = router;
