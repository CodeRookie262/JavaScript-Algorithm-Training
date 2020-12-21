// import module

// Array utils
const ArrayUtils = require('./array');

// log helper
const ToolsLogger = () => console.table(Object.keys(module.exports));

module.exports = {
  ...ArrayUtils,
  logger: ToolsLogger
};
// ToolsLogger();
