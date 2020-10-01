require('spec/specHelper');

// require helpers
const { getAccessToken, testUser } = require('spec/helpers/usersSpecHelper');
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

describe('savingGoal endpoint', () => {
  const testUserExpenseId = Object.keys(testUser.spendingPlan.expenses)[0];
  let accessToken;

  beforeEach(async () => {
    accessToken = await getAccessToken();
  });

  describe('POST /api/users/:userId/spending-plan/saving-goal', () => {
    test('no login token', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/saving-goal`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });
  })
})