require('spec/specHelper');
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

beforeEach(async () => {
  await db.dynamoDb.put({
    TableName: db.users,
    Item: {
      userId: '1',
      username: 'test',
      email: 'test@example.com',
      password: 'passwordHash',
    },
  }).promise();
});

afterEach(async () => {
  await db.dynamoDb.delete({
    TableName: db.users,
    Key: {
      userId: '1',
    },
  }).promise();
});

describe('sessions endpoint', () => {
  describe('POST /api/sessions', () => {
    test('unknown user', async () => {
      await request
        .post('/api/sessions')
        .send({
          user: 'not a user',
          password: 'password',
        })
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.body.message).toBe('User not found');
        });
    });
  });
});
