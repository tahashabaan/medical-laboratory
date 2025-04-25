import { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';

import { logger } from '../config/winston';
import { Custom } from '../errors/custom-error';
import { QueryFailedError } from 'typeorm';

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.log(err);
  if (err instanceof Custom) {
    return res.status(err.statusCode).json(err.serializeError());
  }
  if (err instanceof MulterError)
    return res.status(400).json({ errors: [{ message: `${err.field} is invalid` }] });

  if (err instanceof QueryFailedError) {
    logger.error('QueryFailedError');
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }

  logger.error(err);
  res.status(500).json({ errors: [{ message: 'server error' }] });
};
