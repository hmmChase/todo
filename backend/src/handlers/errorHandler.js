import logger from './logHandler.js';

export class CustomError extends Error {
  constructor(error, name, status) {
    // Pass remaining arguments (including vender specific ones) to parent constructor
    super(error);

    // Maintains proper stack trace for where our error was thrown (node v8)
    if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);

    this.name = name;
    this.status = status;
  }
}

export const handleErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

export const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';

  const errorDetails = {
    name: err.name,
    status: err.status,
    error: err.message,
    stack: err.stack
  };

  logger.error(err);

  return res.status(err.status || 500).json(errorDetails);
};

export const productionErrors = (err, req, res, next) => {
  logger.error(err);

  const errorDetails = { name: err.name, error: err.message };

  return res.status(err.status || 500).json(errorDetails);
};

export const notFound = (req, res, next) => {
  const err = Error('server.notFound');

  err.status = 404;

  logger.error(err);

  next(err);
};

// 403 = user record not found
// 401 = wrong password
