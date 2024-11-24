const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
  // Get validation errors from the request
  const errors = validationResult(req);

  // If there are validation errors, return a 400 status with the error details
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // If no errors, continue to the next middleware or route handler
  next();
};