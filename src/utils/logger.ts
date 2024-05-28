import { join } from 'path';
import {
  Logger as WinstonLogger,
  addColors,
  createLogger,
  format,
  transports,
} from 'winston';
import { Config } from './config';

class Logger {
  private static instance: WinstonLogger;
  private constructor() {}

  public static GetInstance(): WinstonLogger {
    if (!Logger.instance) {
      const env = Config.GetInstance().env;
      addColors({
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'rainbow',
      });
      Logger.instance = createLogger({
        defaultMeta: {},
        format: format.combine(
          format.timestamp({
            format: 'YYYY-MM-DDTHH:MM:sss.SSS',
          }),
          format.errors({ stack: true }),
        ),
        transports: [
          new transports.Console({
            level: env.NODE_ENV === 'prod' ? 'error' : 'debug',
            format: format.combine(
              format.colorize({
                all: true,
              }),
              format.printf(
                ({ level, message, service, timestamp }) =>
                  `[${timestamp} ${service ?? 'error'}] ${level}: ${message}`,
              ),
            ),
          }),
          new transports.File({
            level: env.NODE_ENV === 'prod' ? 'error' : 'debug',
            dirname: join(__dirname, '..', '..', 'logs'),
            filename: `combined-${new Date().toISOString().split('T')[0]}.log`,
            format: format.combine(format.json()),
          }),
          new transports.File({
            level: 'error',
            dirname: join(__dirname, '..', '..', 'logs'),
            filename: `error-${new Date().toISOString().split('T')[0]}.log`,
            format: format.combine(format.json()),
          }),
        ],
      });
    }
    return Logger.instance;
  }
}

export default Logger;
