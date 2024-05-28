import request from 'supertest';

import app from './app';

describe('App', () => {
  describe('When index route is requested', () => {
    it('Then should respond with a valid status code and JSON message', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('api.zen.scroll');
    });
  });

  describe('When a non-existent route', () => {
    it('Then should respond with a not-found message', async () => {
      const notFoundUrl = '/notFoundUrl';
      const response = await request(app).get(notFoundUrl);

      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.status).toBe(404);
      expect(response.body.message).toBe(`🔍 - Not Found - ${notFoundUrl}`);
      expect(response.body).toHaveProperty('stack');
    });
  });
});
