const winston = require('winston');
const path = require('path');

const filelogs = {
  warn: path.join(__dirname, '/logs/', 'warnings.log.json'),
  error: path.join(__dirname, '/logs/', 'errors.log.json')
};

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      level: 'warn',
      name: 'warnings',
      filename: filelogs.warn,
    }),

    new (winston.transports.File)({
      level: 'error',
      name: 'errors',
      filename: filelogs.error,
    }),

    new (winston.transports.Console)({
      colorize: true
    })

  ]
});

module.exports = logger;