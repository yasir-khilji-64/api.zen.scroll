import { config } from 'dotenv';
import { z } from 'zod';

config();

export class Config {
  private static instance: Config;
  private static schema = z.object({
    PORT: z.coerce
      .number()
      .positive({ message: 'PORT must be a positive number' })
      .min(1000, { message: 'PORT must be greater than 1000' })
      .max(9999, { message: 'PORT must be less than 9999' })
      .default(3000),
    NODE_ENV: z
      .union([z.literal('dev'), z.literal('test'), z.literal('prod')])
      .default('dev'),
  });
  private constructor() {
    this.env = Config.schema.parse(process.env);
  }

  public env: z.infer<typeof Config.schema>;
  public static GetInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}
