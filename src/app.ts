import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';

import HttpStatus from './utils/htttp-status.enum';
import { notFound, errorHandler } from './middlewares/error.middleware';
import { MessageResponse } from './types/message-response.type';
import { RequestLogger } from './middlewares/request-logger.middleware';
import { HealthCheckResponse } from './types/health-check-response.type';

const app = express();

app.use(cors());
app.use(helmet());
app.use(RequestLogger);
app.use(express.json());

app.get('/', (_: Request, res: Response<MessageResponse>) => {
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message: 'api.zen.scroll',
  });
});
app.get('/healthcheck', (_: Request, res: Response<HealthCheckResponse>) => {
  const databaseState = mongoose.connection.readyState;
  const databaseStatus: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const healthcheck: HealthCheckResponse = {
    status: HttpStatus.OK,
    message: 'OK',
    database: databaseStatus[databaseState] || 'unknown',
    timestamp: new Date(),
    uptime: process.uptime(),
  };

  if (databaseState !== 1) {
    res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      ...healthcheck,
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'Service Unavailable',
    });
  }
  res.status(healthcheck.status).json(healthcheck);
});

app.use(notFound);
app.use(errorHandler);

export default app;
