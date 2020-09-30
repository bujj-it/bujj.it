// setup environment
require('spec/specHelper');

// create app
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

describe('spendingPlans endpoint', () => {
  describe('POST /api/spending-plans', () => {
    test('no login token', async () => {
      const response = await request.post('/api/spending-plans');
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });
  });
});
