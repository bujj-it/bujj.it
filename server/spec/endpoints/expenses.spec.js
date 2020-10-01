require('spec/specHelper');

// require helpers
const { getAccessToken, testUser, testUser2 } = require('spec/helpers/usersSpecHelper');
const uuid = require('uuid');

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
}));

// create app
const db = require('spec/dbSetup');
const app = require('app')(db);
const request = require('supertest')(app);

beforeEach(async () => {
  await db.dynamoDb
    .put({
      TableName: db.users,
      Item: testUser,
    })
    .promise();
});

afterEach(async () => {
  await db.dynamoDb
    .delete({
      TableName: db.users,
      Key: {
        userId: testUser.userId,
      },
    })
    .promise();
});

describe('spendingPlan endpoint', () => {
  let accessToken;

  beforeEach(async () => {
    accessToken = await getAccessToken();
  });

  describe('POST /api/users/:userId/spending-plan/expenses', () => {
    test('no login token', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });

    test('deleted session user', async () => {
      await db.dynamoDb
        .delete({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        })
        .promise();
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('user page invalid', async () => {
      const response = await request
        .post('/api/users/not-a-user-id/spending-plan/expenses')
        .set('cookie', accessToken);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User page not found!');
    });

    test('user unauthorized', async () => {
      await db.dynamoDb
        .put({
          TableName: db.users,
          Item: testUser2,
        }).promise();
      const response = await request
        .post(`/api/users/${testUser2.userId}/spending-plan/expenses`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('You have insufficient rights to view this page');
      await db.dynamoDb
        .delete({
          TableName: db.users,
          Key: {
            userId: testUser2.userId,
          },
        }).promise();
    });

    test('blank form', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"id":"string","name":"string","value":"number"}');
    });

    test('invalid expenses key format', async () => {
      const testExpenses = { notId: 'test', notName: 'rent', notValue: 500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpenses);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"id":"string","name":"string","value":"number"}');
    });
  });
});
