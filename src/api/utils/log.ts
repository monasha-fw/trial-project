import winston from 'winston';

const logFormat = winston.format.printf(({ level, stack, message, timestamp }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: []
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: false }),
        logFormat
      ),
      level: 'info'
    })
  );
  //
  // - Write all logs with importance level of `error` or lower to `error.log`
  // - Write all logs with importance level of `info` or lower to `combined.log`
  //
  logger.add(new winston.transports.File({ filename: 'error.log', level: 'error', zippedArchive: true }));
  logger.add(new winston.transports.File({ filename: 'combined.log', zippedArchive: true }));
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        logFormat
      )
    })
  );
}
export default logger;
