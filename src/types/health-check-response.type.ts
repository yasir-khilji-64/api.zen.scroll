import { MessageResponse } from './message-response.type';

export type HealthCheckResponse = MessageResponse & {
  database: string;
  timestamp: Date;
  uptime: number;
};
