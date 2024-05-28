import { NextFunction, Request, Response } from 'express';

import { Config } from '../utils/config';
import { ErrorResponse } from '../types/error-response.type';

const env = Config.GetInstance().env;

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
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
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: env.NODE_ENV === 'prod' ? '🥞' : err.stack,
  });
}
