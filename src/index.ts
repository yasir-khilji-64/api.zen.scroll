import { connection } from 'mongoose';

import app from './app';
import Logger from './utils/logger';
import { Config } from './utils/config';
import { connectDatabase } from './utils/database';

const TAG = 'Index';
const logger = Logger.GetInstance();
const port = Config.GetInstance().env.PORT;

async function bootstrap() {
  try {
    await connectDatabase();
    const server = app.listen(port, '0.0.0.0', () => {
      logger.info(`Server: http://127.0.0.1:${port}`, { component: TAG });
    });

    process.on('SIGINT', async () => {
      await connection.close();
      server.close(() => {
        logger.info('Server closed', { component: TAG });
      });
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
