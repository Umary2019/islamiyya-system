const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Create JWT Token
const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validation
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Prevent self-registration as admin (admin account is system-managed)
    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin account registration is disabled' });
    }

    // Create new user
    const newUser = new User({ name, email, phone, password, role });
    await newUser.save();

    // Generate token
    const token = createToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user and include password field
    const user = await User.findOne({ email })
      .select('+password')
      .populate('studentId', 'name email')
      .populate('teacherId', 'name email');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = createToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        studentId: user.studentId,
        teacherId: user.teacherId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Current User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('studentId', 'name email')
      .populate('teacherId', 'name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        studentId: user.studentId,
        teacherId: user.teacherId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
