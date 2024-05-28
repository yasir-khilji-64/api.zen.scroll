import { NextFunction, Request, Response } from 'express';

import HttpStatus from '../utils/htttp-status.enum';
import { Config } from '../utils/config';
import { ErrorResponse } from '../types/error-response.type';

const env = Config.GetInstance().env;

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatus.NOT_FOUND);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  _: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction,
) {
  const statusCode =
    res.statusCode !== HttpStatus.OK
      ? res.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: env.NODE_ENV === 'prod' ? '🥞' : err.stack,
  });
}
