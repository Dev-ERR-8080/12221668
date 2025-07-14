// src/logger.js
module.exports = function Log(stack, level, pkg, message) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message,
  };

  // In production, this can be sent to an external log collector
  console.log(JSON.stringify(logEntry));
};
