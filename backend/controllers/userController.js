const User = require('../models/User');

// Get all users by role (Admin only)
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const query = role ? { role } : {};
    const users = await User.find(query).select('-password');

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.status(200).json({
      count: staff.length,
      staff,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .populate('teacherId', 'name email');

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent' })
      .select('-password')
      .populate('studentId', 'name email');

    res.status(200).json({
      count: parents.length,
      parents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign teacher to student
exports.assignTeacherToStudent = async (req, res) => {
  try {
    const { studentId, teacherId } = req.body;

    const student = await User.findByIdAndUpdate(
      studentId,
      { teacherId },
      { new: true }
    ).populate('teacherId', 'name email');

    res.status(200).json({
      message: 'Teacher assigned successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Link parent to student
exports.linkParentToStudent = async (req, res) => {
  try {
    const { parentId, studentId } = req.body;

    const parent = await User.findByIdAndUpdate(
      parentId,
      { studentId },
      { new: true }
    ).populate('studentId', 'name email');

    res.status(200).json({
      message: 'Parent linked to student successfully',
      parent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('studentId', 'name email')
      .populate('teacherId', 'name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
