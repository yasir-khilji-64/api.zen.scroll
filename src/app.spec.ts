import request from 'supertest';

import app from './app';
import HttpStatus from './utils/htttp-status.enum';

describe('App', () => {
  describe('When index route is requested', () => {
    it('Then should respond with a valid status code and JSON message', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.status).toBe(HttpStatus.OK);
      expect(response.body.message).toBe('api.zen.scroll');
    });
  });

  describe('When a non-existent route', () => {
    it('Then should respond with a not-found message', async () => {
      const notFoundUrl = '/notFoundUrl';
      const response = await request(app).get(notFoundUrl);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.status).toBe(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBe(`🔍 - Not Found - ${notFoundUrl}`);
      expect(response.body).toHaveProperty('stack');
    });
  });
});
