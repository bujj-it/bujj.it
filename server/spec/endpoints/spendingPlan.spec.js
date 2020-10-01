// setup environment
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

  describe('POST /api/users/:userId/spending-plan', () => {
    test('no login token', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`);
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
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('user page invalid', async () => {
      const response = await request
        .post('/api/users/not-a-user-id/spending-plan')
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
        .post(`/api/users/${testUser2.userId}/spending-plan`)
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

    test('empty form', async () => {
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        expenses: 'Expenses cannot be blank!',
        income: 'Income cannot be blank!',
        savingPercentage: 'Saving percentage cannot be blank!',
      });
    });

    test('blank income', async () => {
      const testSpendingPlan = {
        income: null,
        expenses: [{ name: 'rent', value: 500 }],
        savingPercentage: 10,
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
        savingPercentage: 10,
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
        savingPercentage: 10,
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
        savingPercentage: 10,
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
        savingPercentage: 10,
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

    test('blank savingPercentage', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: 'rent', value: 500 }],
        savingPercentage: null,
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        savingPercentage: 'Saving percentage cannot be blank!',
      });
    });

    test('invalid savingPercentage', async () => {
      const testSpendingPlan = {
        income: 1000,
        expenses: [{ name: 'rent', value: 500 }],
        savingPercentage: 'not a number',
      };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan`)
        .set('cookie', accessToken)
        .send(testSpendingPlan);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        savingPercentage: 'Saving percentage format invalid, must be number!',
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
        savingPercentage: 10,
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
      expect(resultSpendingPlan.savingPercentage).toEqual(
        testSpendingPlan.savingPercentage,
      );
      mockUuidV1.mockRestore();
    });
  });
});
