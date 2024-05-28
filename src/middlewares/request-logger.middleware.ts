import morgan from 'morgan';

import Logger from '../utils/logger';

const logger = Logger.GetInstance();

export const RequestLogger = morgan('common', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});
