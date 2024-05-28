import cors from 'cors';
import helmet from 'helmet';
import express, { Request, Response } from 'express';

import { notFound, errorHandler } from './middlewares/error.middleware';
import { MessageResponse } from './types/message-response.type';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_: Request, res: Response<MessageResponse>) => {
  res.status(200).json({
    status: 200,
    message: 'api.zen.scroll',
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
