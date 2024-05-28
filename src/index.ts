import app from './app';
import Logger from './utils/logger';
import { Config } from './utils/config';

const TAG = 'Index';
const logger = Logger.GetInstance();
const port = Config.GetInstance().env.PORT;

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server: http://127.0.0.1:${port}`, { service: TAG });
});
