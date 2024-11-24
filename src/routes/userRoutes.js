const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');

const router = express.Router();

// User registration route
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validation.handleValidationErrors,
  ],
  userController.register
);

// User login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').exists().withMessage('Password is required'),
    validation.handleValidationErrors,
  ],
  userController.login
);

// Get user profile route
router.get('/profile', auth, userController.getProfile);

module.exports = router;