const { createLogger, format, transports } = require('winston');
const util = require('util');
const path = require('path');


const { combine, printf, colorize, errors } = format;

// Validate message
const validateMessage = format((info) => {
  if (typeof info.message !== 'string') {
    info.message = JSON.stringify(info.message);
  }
  return info;
});

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info) => {
  if (info.private) return false;
  return info;
});

// Hide sensitive information
const hideSensitive = format((info) => {
  info.message = info.message.replace(/:\w+@/, ':***@');
  return info;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    errors({ stack: true }),
    validateMessage(),
    ignorePrivate(),
    hideSensitive(),
    format.timestamp(),
    printf((msg) => {
      const { level, timestamp, message, ...meta } = msg;
      const data = { message, ...meta };
      let isCircularStructure = false;

      try {
        JSON.stringify(data);
      } catch (error) {
        if (error.message.match('Converting circular structure to JSON')) {
          isCircularStructure = true;
        }
      }

      const formattedData = isCircularStructure
        ? util.inspect(data)
        : JSON.stringify(data);

      // eslint-disable-next-line prettier/prettier
      return colorize().colorize(level, `[${timestamp}] \x1b[1m[${level}]\x1b[0m ${formattedData}`);
    }),
  ),
  transports: [new transports.Console()],
});

if (process.env.NODE_ENV == 'production') {
  logger.clear().add(
    new transports.Console({
      filename: path.join(__dirname, '..', '/log/errors.log'),
      format: combine(
        errors({ stack: true }),
        validateMessage(),
        ignorePrivate(),
        hideSensitive(),
        format.timestamp(),
        printf((msg) => {
          const { level, timestamp, message, ...meta } = msg;
          const data = { timestamp, level, message, ...meta };
          let isCircularStructure = false;
    
          try {
            JSON.stringify(data);
          } catch (error) {
            if (error.message.match('Converting circular structure to JSON')) {
              isCircularStructure = true;
            }
          }
    
          const formattedData = isCircularStructure
            ? util.inspect(data)
            : JSON.stringify(data);
    
          // eslint-disable-next-line prettier/prettier
          return `${formattedData}`;
        }),
      ),
      transports: [new transports.Console()],
    }),
    logger.clear().add(
    new transports.File({
      filename: path.join(__dirname, '..', '/log/errors.log'),
      format: combine(
        errors({ stack: true }),
        validateMessage(),
        ignorePrivate(),
        hideSensitive(),
        format.timestamp(),
        printf((msg) => {
          const { level, timestamp, message, ...meta } = msg;
          const data = { timestamp, level, message, ...meta };
          let isCircularStructure = false;
    
          try {
            JSON.stringify(data);
          } catch (error) {
            if (error.message.match('Converting circular structure to JSON')) {
              isCircularStructure = true;
            }
          }
    
          const formattedData = isCircularStructure
            ? util.inspect(data)
            : JSON.stringify(data);
    
          // eslint-disable-next-line prettier/prettier
          return `${formattedData}`;
        }),
      ),
      transports: [new transports.Console()],
    })
  )
  );
}


if (process.env.NODE_ENV !== 'production') {
  logger.clear().add(
    new transports.Console({
      filename: path.join(__dirname, '..', '/log/errors.log'),
      format: combine(
        errors({ stack: true }),
        validateMessage(),
        ignorePrivate(),
        hideSensitive(),
        format.timestamp(),
        printf((msg) => {
          const { level, timestamp, message, ...meta } = msg;
          const data = { timestamp, level, message, ...meta };
          let isCircularStructure = false;
    
          try {
            JSON.stringify(data);
          } catch (error) {
            if (error.message.match('Converting circular structure to JSON')) {
              isCircularStructure = true;
            }
          }
    
          const formattedData = isCircularStructure
            ? util.inspect(data)
            : JSON.stringify(data);
    
          // eslint-disable-next-line prettier/prettier
          return `${formattedData}`;
        }),
      ),
      transports: [new transports.Console()],
    }),
    logger.clear().add(
    new transports.File({
      filename: path.join(__dirname, '..', '/log/errors.log'),
      format: combine(
        errors({ stack: true }),
        validateMessage(),
        ignorePrivate(),
        hideSensitive(),
        format.timestamp(),
        printf((msg) => {
          const { level, timestamp, message, ...meta } = msg;
          const data = { timestamp, level, message, ...meta };
          let isCircularStructure = false;
    
          try {
            JSON.stringify(data);
          } catch (error) {
            if (error.message.match('Converting circular structure to JSON')) {
              isCircularStructure = true;
            }
          }
    
          const formattedData = isCircularStructure
            ? util.inspect(data)
            : JSON.stringify(data);
    
          // eslint-disable-next-line prettier/prettier
          return `${formattedData}`;
        }),
      ),
      transports: [new transports.Console()],
    })
  )
  );
}

module.exports = logger;
