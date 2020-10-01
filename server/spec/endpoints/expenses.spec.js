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
  const testUserExpenseId = Object.keys(testUser.spendingPlan.expenses)[0];
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

    test('requested user invalid', async () => {
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

    test('invalid expense key format', async () => {
      const testExpenses = { notName: 'rent', notValue: 500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpenses);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('invalid expense value types', async () => {
      const testExpenses = { name: {}, notValue: '500' };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpenses);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('successful expense creation', async () => {
      const uniqueId1 = 'uniqueId1';
      const mockUuidV1 = jest
        .spyOn(uuid, 'v1')
        .mockReturnValue(uniqueId1);
      const testExpense = { name: 'rent', value: 500 };
      const response = await request
        .post(`/api/users/${testUser.userId}/spending-plan/expenses`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('New expense added.');
      expect(response.body.expense[uniqueId1]).toMatchObject(testExpense);
      const userRecord = await db.dynamoDb
      .get({
        TableName: db.users,
        Key: {
          userId: testUser.userId,
        },
      }).promise();
      expect(userRecord.Item.spendingPlan.expenses[uniqueId1]).toMatchObject(testExpense);
      mockUuidV1.mockRestore();
    });
  });

  describe('PUT /api/users/:userId/spending-plan/expenses/:expenseId', () => {
    test('no login token', async () => {
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`);
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
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('requested user invalid', async () => {
      const response = await request
        .put(`/api/users/not-a-user-id/spending-plan/expenses/${testUserExpenseId}`)
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
        .put(`/api/users/${testUser2.userId}/spending-plan/expenses/${testUserExpenseId}`)
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

    test('invalid expense key format', async () => {
      const testExpense = { notName: 'rent', notValue: 500 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Invalid expense format, format must match: {"name":"string","value":"number (currency)"}');
    });

    test('invalid expenseId', async () => {
      const testExpense = { name: 'rent', value: 500 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/not-an-expense-id`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Expense ID not found.');
    });

    test('successful expense update', async () => {
      const testExpense = { name: 'new expense name', value: 512 };
      const response = await request
        .put(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken)
        .send(testExpense);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Expense updated.');
      expect(response.body.expense[testUserExpenseId]).toMatchObject(testExpense);
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.expenses[testUserExpenseId]).toMatchObject(testExpense);
    });
  });

  describe('DELETE /api/users/:userId/spending-plan/expenses/:expenseId', () => {
    test('no login token', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`);
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
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('User not found!');
    });

    test('requested user invalid', async () => {
      const response = await request
        .delete(`/api/users/not-a-user-id/spending-plan/expenses/${testUserExpenseId}`)
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
        .delete(`/api/users/${testUser2.userId}/spending-plan/expenses/${testUserExpenseId}`)
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

    test('invalid expenseId', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/not-an-expense-id`)
        .set('cookie', accessToken);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Expense ID not found.');
    });

    test('valid request', async () => {
      const response = await request
        .delete(`/api/users/${testUser.userId}/spending-plan/expenses/${testUserExpenseId}`)
        .set('cookie', accessToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Expense removed.');
      const userRecord = await db.dynamoDb
        .get({
          TableName: db.users,
          Key: {
            userId: testUser.userId,
          },
        }).promise();
      expect(userRecord.Item.spendingPlan.expenses[testUserExpenseId]).toBeUndefined();
    });
  });
});
