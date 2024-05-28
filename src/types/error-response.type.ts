import { MessageResponse } from './message-response.type';

export type ErrorResponse = MessageResponse & {
  stack?: string;
};
