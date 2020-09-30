// setup environment
require('spec/specHelper');

// require helpers
const { getAccessToken, testUser } = require('spec/helpers/usersHelper');
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

describe('spendingPlans endpoint', () => {
  describe('POST /api/spending-plans', () => {
    let accessToken;

    beforeEach(async () => {
      accessToken = await getAccessToken();
    });

    test('no login token', async () => {
      const response = await request.post('/api/spending-plans');
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });

    test('blank income', async () => {
      const testSpendingPlan = {
        income: null,
        expenses: [{ name: 'rent', value: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post('/api/spending-plans')
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        income: 'Income cannot be blank!',
      });
    });

    test('invalid income format', async () => {
      const testSpendingPlan = {
        income: 123.123,
        expenses: [{ name: 'rent', value: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post('/api/spending-plans')
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        income: 'Income format invalid, must be integer or decimal currency!',
      });
    });

    test('blank expenses', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [],
        saving_percentage: 10,
      };
      const response = await request
        .post('/api/spending-plans')
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: 'Expenses cannot be blank!',
      });
    });

    test('invalid expenses format', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ notName: 'rent', notValue: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post('/api/spending-plans')
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: "Expenses format invalid, keys must be 'name' and 'value'!",
      });
    });

    test('successful spendingPlan creation - 1 expense', async () => {
      const uniqueId1 = 'uniqueId1';
      const mockUuidV1 = jest.spyOn(uuid, 'v1').mockReturnValue(uniqueId1);
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: 'rent', value: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post('/api/spending-plans')
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New Spending Plan created.');
      const checkSpendingPlanParams = {
        Key: { userId: testUser.userId },
        TableName: db.users,
      };
      const result = await db.dynamoDb.get(checkSpendingPlanParams).promise();
      const resultSpendingPlan = result.Item.spendingPlan;
      expect(resultSpendingPlan.income).toEqual(testSpendingPlan.income);
      expect(resultSpendingPlan.expenses.uniqueId1).toEqual(
        testSpendingPlan.expenses[0],
      );
      expect(resultSpendingPlan.saving_percentage).toEqual(
        testSpendingPlan.saving_percentage,
      );
      mockUuidV1.mockRestore();
    });
  });
});
