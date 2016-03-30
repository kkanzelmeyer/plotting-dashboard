import winston from 'winston';

/**
 *  LOGGING UTILITY
 */

export const logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)()
  ]
});
