import mongoose from 'mongoose';
import Logger from './logger';
import { Config } from './config';

const TAG = 'Database';

export const connectDatabase = async (): Promise<void> => {
  const logger = Logger.GetInstance();
  const env = Config.GetInstance().env;
  const host = env.MONGO_HOST;
  const username = env.MONGO_USERNAME;
  const password = env.MONGO_PASSWORD;
  const database = env.MONGO_DATABASE;
  const uri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=zen-scroll`;

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected', { component: TAG });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected', { component: TAG });
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB connected', { component: TAG });
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error}`, { component: TAG });
  });

  mongoose.connection.on('close', () => {
    logger.verbose('MongoDB connection closed', { component: TAG });
  });

  try {
    await mongoose.connect(uri);
  } catch (err: unknown) {
    const error: Error = err as Error;
    logger.error(error.message, { component: TAG });
    throw error;
  }
};
