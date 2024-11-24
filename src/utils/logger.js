const winston = require('winston');

// Create a logger instance with specific configurations
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamp in logs
    winston.format.json() // Format logs as JSON
  ),
  transports: [
    // Transport for logging errors into error.log
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Transport for logging all messages into combined.log
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Add console logging for non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple() // Simple format for console logs
  }));
}

module.exports = logger;