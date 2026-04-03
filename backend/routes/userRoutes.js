const express = require('express');
const {
  getUsersByRole,
  getAllStaff,
  getAllStudents,
  getAllParents,
  assignTeacherToStudent,
  linkParentToStudent,
  getUserById,
  deleteUser,
} = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Admin routes
router.get('/', authenticateToken, authorizeRole('admin'), getUsersByRole);
router.get('/staff', authenticateToken, authorizeRole('admin'), getAllStaff);
// Allow both admin and staff to view students
router.get('/students', authenticateToken, getAllStudents);
router.get('/parents', authenticateToken, authorizeRole('admin'), getAllParents);
router.post('/assign-teacher', authenticateToken, authorizeRole('admin'), assignTeacherToStudent);
router.post('/link-parent', authenticateToken, authorizeRole('admin'), linkParentToStudent);
router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

module.exports = router;
