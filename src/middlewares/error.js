const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  // Log the error stack for debugging
  logger.error(err.stack);

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Default error handler
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};