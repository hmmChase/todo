import winston from 'winston';
// import 'winston-daily-rotate-file';

const logger = new winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      colorize: true,
      json: false,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })

    // new winston.transports.File({
    //   level: 'info',
    //   filename: './logs/logs.log',
    //   handleExceptions: true,
    //   json: true,
    //   maxsize: 5242880, // 5MB
    //   maxFiles: 5,
    //   colorize: false
    // })
  ],

  exitOnError: false
});

// winston.addColors({ error: 'red', info: 'cyan', warn: 'yellow' });

export default logger;

//   transports: [
//     new winston.transports.Console({
//       colorize: true,
//       json: false,
//       handleExceptions: true,
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//       )
//     })

//     // new winston.transports.File({
//     //   level: 'info',
//     //   filename: './logs/logs.log',
//     //   handleExceptions: true,
//     //   json: true,
//     //   maxsize: 5242880, // 5MB
//     //   maxFiles: 5,
//     //   colorize: false
//     // })
//   ],
//   exitOnError: false
// });

// // const colors = { error: 'red', info: 'cyan', warn: 'yellow' };

// // winston.addColors(colors);

// logger.stream = { write: message => logger.info(message) };

// export default logger;
