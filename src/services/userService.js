const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class UserService {
  // Create a new user
  async createUser(userData) {
    const user = await User.create(userData);
    return this._sanitizeUser(user);
  }

  // Log in a user
  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = this._generateToken(user);
    return {
      user: this._sanitizeUser(user),
      token,
    };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this._sanitizeUser(user);
  }

  // Generate a JWT token for the user
  _generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  // Remove sensitive fields from the user object
  _sanitizeUser(user) {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }
}

module.exports = new UserService();