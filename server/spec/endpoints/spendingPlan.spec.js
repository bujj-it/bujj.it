// setup environment
require('spec/specHelper');

// require helpers
const { getAccessToken, testUser, testUser2 } = require('spec/helpers/usersHelper');
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

  describe('POST /api/users/:id/spending-plan', () => {
    test('no login token', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`);
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
        .post(`/api/users/${testUser.userId}/spending-plan`)
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
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        income: 'Income format invalid, must be integer or decimal currency!',
      });
    });

    test('invalid expenses key format', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ notName: 'rent', notValue: 500 }],
        saving_percentage: 10,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: "Expenses format invalid, keys must be 'name' and 'value'!",
      });
    });

    test('invalid expenses value format', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: {}, value: 'not a number' }],
        saving_percentage: 10,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: "Expenses types invalid, values for 'name' must be string and 'value' number!",
      });
    });

    test('invalid expenses values', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: '', value: -1 }],
        saving_percentage: 10,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: "Expenses format invalid, values for 'name' must be a-zA-Z0-9_ and 'value' currency!",
      });
    });

    test('blank saving_percentage', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: 'rent', value: 500 }],
        saving_percentage: null,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        saving_percentage: 'Saving percentage cannot be blank!',
      });
    });

    test('invalid saving_percentage', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: 'rent', value: 500 }],
        saving_percentage: 'not a number',
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        saving_percentage: 'Saving percentage format invalid, must be number!',
      });
    });

    test('successful spendingPlan creation - 2 expenses', async () => {
      const uniqueId1 = 'uniqueId1';
      const uniqueId2 = 'uniqueId2';
      const mockUuidV1 = jest
        .spyOn(uuid, 'v1')
        .mockReturnValueOnce(uniqueId1)
        .mockReturnValueOnce(uniqueId2);
      const testSpendingPlan = {
        income: 1000,
        expenses: [
          { name: 'rent', value: 500 },
          { name: 'shopping', value: 200 },
        ],
        saving_percentage: 10,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`).set('cookie', accessToken)
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
      expect(resultSpendingPlan.expenses.uniqueId2).toEqual(
        testSpendingPlan.expenses[1],
      );
      expect(resultSpendingPlan.saving_percentage).toEqual(
        testSpendingPlan.saving_percentage,
      );
      mockUuidV1.mockRestore();
    });
  });

  describe('GET /api/users/:id/spending-plan', () => {
    const seedSpendingPlan = {
      income: 1000,
      expenses: {
        uniqueId1: { name: 'rent', value: 500 },
        uniqueId2: { name: 'shopping', value: 200 },
      },
      saving_percentage: 10,
    };

    beforeEach(async () => {
      await db.dynamoDb
        .update({
          TableName: db.users,
          Key: { userId: testUser.userId },
          UpdateExpression: 'SET spendingPlan = :newSpendingPlan',
          ExpressionAttributeValues: { ':newSpendingPlan': seedSpendingPlan },
        })
        .promise();
    });

    test('no login token', async () => {
      const response = await request.get(`/api/users/${testUser.userId}/spending-plan`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });
  });
});
